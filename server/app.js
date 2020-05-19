const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const crypto = require('crypto');
const cors = require('cors');

const api = require('./routes/api');
const pro_api = require('./routes/pro_api');

const config = require('./config');

const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const secret = config.jwt.secret;

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function (data) {
        console.log(data);
        client.emit('messages', 'Hello from server');
    });
});

server.listen(4200);

// use it before all route definitions
app.use(cors({origin: 'http://momentodengi.ru:7100'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', api);

app.get('/conf2017', function (req, res) {
    res.sendFile(__dirname + '/public/conf2017/index.html');
});

app.get('/md-admin*', function(req, res) {
    res.render('admin/dashboard', {title: 'Админпанель'});
});

app.post('/token', function (req, res) {
    const login = req.body.login;
    const password = crypto.createHash('md5').update(req.body.password).digest("hex");
    console.log(password);
    const users = {
        anykey: 'aa062a844269f0369883d3e6787d8753',
        mdadmin: '2b2f4507ee9dcedd17456cc9b5f735b2'
    };
    if (users[login] && users[login] === password) {
        const data = {
            user: login
        };
        return res.json(jwt.sign(data, secret))
    } else {
        return res.send(401);
    }

});

app.use('/pro_api', expressJwt({secret}), pro_api);

app.use(function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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
