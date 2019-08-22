var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
/////
var producto = require ('./routes/producto');  
var venta = require('./routes/venta');
var compra =require('./routes/compra');

var ventas= require('./routes/ventas');
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
//CONEXION MONGO DB
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/proyecto');
var db=mongoose.connection;
db.on('error',function(err){

  console.log("error",err);
});
db.once('open', function(){
  console.log('CONECTADO!');
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
/////////
app.use('/api/producto', producto);
app.use('/venta', venta);

app.use('/api/ventas',require('./routes/ventas') );
app.use('/compra', compra);

app.use('/api/usuario',require('./routes/usuario'));

app.use('/api/ubicacion',require('./routes/ubicacion'));
app.use('/api/reyna',reyna);
app.use('/api/fraternidad',require('./routes/fraternidad'));

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
