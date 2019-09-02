var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var formidable= require("express-formidable");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
/////

var reyna= require('./routes/reyna');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/proyecto');
var db=mongoose.connection;
db.on('error',function(err){

  console.log("error",err);
});
db.once('open', function(){
  console.log('CONECTADO!');
});

//app.use(formidable.parse({keepExtensions:true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();

});



app.use('/', indexRouter);
app.use('/users', usersRouter);
/////////

app.use('/api/usuario',require('./routes/usuario'));

app.use('/api/ubicacion',require('./routes/ubicacion'));
app.use('/api/reyna',reyna);
app.use('/api/fraternidad',require('./routes/fraternidad'));
app.use('/api/comentario',require('./routes/comentario'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
