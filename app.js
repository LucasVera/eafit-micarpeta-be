require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

var indexRouter = require('./src/routes/index');
const apiRouter = require('./src/routes/api');
const initMongoConnection = require('./src/db/initConnection');

var app = express();
app.server = http.createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.json({
  limit: '10000kb'
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
apiRouter(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('Error catcher', err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.server.listen(process.env.PORT || 8080, () => {
  console.log(`Started on port ${app.server.address().port}`);
  initMongoConnection();
});

module.exports = app;
