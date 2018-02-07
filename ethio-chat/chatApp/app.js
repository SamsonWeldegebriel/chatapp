var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
const http = require('http');
var mongo = require('mongojs');
var cors = require('cors');
var db = mongo('mongodb://s:s@ds215388.mlab.com:15388/mydatabase');

var group = require('./routes/group');
//var chat = require('./routes/chat');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(cors());
app.options('*', cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// API file for interacting with MongoDB
//const users = require('./server/routes/users');
const chats = require('./routes/chats');


// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.use('/', index);
app.use('/api', users);
app.use('/groups', group);
// API location
app.use('/chats', chats);

//app.use('/chat', chat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = http.createServer(app);
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://ethiochat:ethiochat@ds123728.mlab.com:23728/ethiochat', ['users'])
//   .then(() =>  console.log('connection successful'))
//   .catch((err) => console.error(err));

//creating socket
//var server = http.Server(app);
var io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('new user connection made');

    socket.on('send-message', function(data) {
        console.log(data.text);
        io.emit('message-received', data);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('add-message', (message) => {
        io.emit('message', { type: 'new-message', text: message });
        // Function above that stores the message in the database
        //databaseStore(message)
    });

});
// app.listen(8000, () => {
//   console.log('listinig....');
// });
server.listen(8000, () => console.log(`asdfas`));