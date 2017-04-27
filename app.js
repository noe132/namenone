const express           = require('express');
const browserify        = require('browserify-middleware');
const lessMiddleware    = require('less-middleware');
const morgan            = require('morgan');
const favicon           = require('serve-favicon');
const path              = require('path');
const session           = require('express-session');
const MySQLStore        = require('express-mysql-session')(session);
const mysqloption       = require('./src/config/mysqlConfig.js');
const sessionStore      = new MySQLStore(Object.assign(mysqloption, {database: 'chat'}));

const app               = express();

require('./src/module/createDatebase.js')(mysqloption);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    secret: 'asdiuergnkswf',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

/* serve-favicon */
app.use(favicon(path.join(__dirname, '/src/asserts/', 'favicon.ico')));

/* complie less */
app.use('/static/css/', lessMiddleware(__dirname + '/src/less/', {
    dest: __dirname + '/static/css/'
}));

/* browserify js */
app.use('/static/js/main.js', browserify(__dirname + '/src/main.js', {
    transform: ['vueify']
}));

/* serve-static */
app.use('/static/img', express.static('src/asserts/img'));
app.use('/static/css', express.static('static/css'));

// handle request
app.get('/*', function(req, res) {
    res.render('index', { title: 'hello' });
});

/* eslint-disable */
app.listen(8080, function() {
    console.log('namenone app listening on port 8080!');
});
