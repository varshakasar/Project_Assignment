var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var app = express();

var routes = require('./routes/index.js');


mongoose.connect('mongodb://localhost/projectDb');
var db = mongoose.connection;

//handle mongodb error
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {

 console.log("Connected to DataBase...");
});



app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routes);

app.use(function(err,req,res,next) {
  res.status(500).send({"Error" : err.stack});
});

app.set('port', (process.env.PORT || 8000));

app.listen(app.get('port'), () => {
  console.log('Server started on port '+app.get('port'));
});



