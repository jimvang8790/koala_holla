//requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

//postico configuration
var config = {
  database: 'holla', // name of the database used
  host: 'localhost', // host of the database
  port: 5432, // the default port # for database server
  max: 12 // number of people who can connect to the databse
};

//create pool to connect to the database
var pool = new pg.Pool(config);

// app.use set up
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

// spin up server
app.listen(5555, function(){
  console.log('server up on 5555');
});

// getting data from client via ajax
// recieving data with the url /koala
app.get('/koala',function(req,res){
  console.log('in get koala');
  var koalas = []; // name of our empty arrray

  pool.connect(function(err, connection, done){ // err = error
    // begin of if/else statement
    if(err){ // if there is an error then do this
      console.log(err);
      res.send(400); // 400 is an error code
    } // end of if statement

    else{ // otherwise if successful so this
      console.log('connected to db');
      // connecting to the database and selecting the table koala
      var resultSet = connection.query('SELECT * FROM koala');

      resultSet.on('row', function(row){
        koalas.push(row); // push to the koalas array a row the info ex. name, age, sex, etc.
      });// end of resultSet row
      resultSet.on('end', function(){
        done();
        res.send(koalas); // sending back the koalas array
      }); // end of resultSet end
    } //end of else statement
  }); // end of pool.connect
}); // end app.get

// ***NOTE*** this is where a user can add new koala from the DOM and adds to the database
app.post('/addingKoala', function(req, res) {
  var data = req.body; // the data from the client server via ajax. And data is what goes in the body
  var newKoala = [ // an array to use later,
    data.name,
    data.sex,
    data.age,
    data.transfer,
    data.notes
  ];

  // inserting info from the databsae ex name, age, etc.
  // this is the CRUD operations
  var insert = 'INSERT INTO koala (name, sex, age, ready_for_transfer, notes) VALUES ($1, $2, $3, $4, $5)';

  // connecting to the database
  pool.connect(function(err, connection, done){
    // begin of if/else statement
    if(err){
      console.log(err);
      res.send(400);
    } // end of if statement
    else{
      // ***NOTE***
      // look in img folder for dev's notes
      // without the var data, newKoala, insert connection.query will look like
      //connection.query('INSERT INTO koala(name, age) VALUES($1, $2), [req.body.name, rea.body.age]');
      connection.query(insert, newKoala);
      done();
      res.send(200); // 200 is an ok/success code
    } // end of else statement
  }); // end of pool.connection
}); // end of app.post

// ***NOTE***
// this is the function how to delete koala from the DOM and removing them in the database
app.delete(function(req, res){
    console.log('in /remove delete');
    // connecting to the database
    pool.connect(function(err, connection, done){
      if (err) {
        console.log(err);
        res.send(400);
      } // end of if statement
      else { // send query to databse to delete this koala
        connection.query('DELETE from koala where id=' + req.body.id );
      //send response to client
      //close connection
      done();
      res.send(200);
    } // end of
  }); // end of pool.connect
}); // end of app.delete
