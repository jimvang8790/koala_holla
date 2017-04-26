//requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

//postico configuration
var config = {
  database: 'holla',
  host: 'localhost',
  port: 5432,
  max: 12
};

//create pool
var pool = new pg.Pool(config);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


app.listen(5555, function(){
  console.log('server up on 5555');
});

app.get('/koala',function(req,res){
  console.log('in get koala');
  var koalas = [];

  pool.connect(function(err, connection, done){
    if(err){
      console.log(err);
      res.send(400);
    }
    else{
      console.log('connected to db');
      var resultSet = connection.query('SELECT * FROM koala');

      resultSet.on('row', function(row){
        koalas.push(row);
      });
      resultSet.on('end', function(){
        done();
        res.send(koalas);
      });
    }
  });
}); // end app.get

app.post('/addingKoala', function(req, res) {
  var data = req.body;
  var newKoala = [
    data.name,
    data.sex,
    data.age,
    data.transfer,
    data.notes
  ];

  var insert = 'INSERT INTO koala (name, sex, age, ready_for_transfer, notes) VALUES ($1, $2, $3, $4, $5)';

  pool.connect(function(err, connection, done){
    if(err){
      console.log(err);
      res.send(400);
    }
    else{
      connection.query(insert, newKoala);
      done();
      res.send(200);
    }
  });
}); // end of app.post
