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
});
