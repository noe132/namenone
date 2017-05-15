const browserify = require('browserify-middleware');
const express = require('express');
const favicon = require('serve-favicon');
const lessMiddleware = require('less-middleware');
const morgan = require('morgan');
const mysqloption = require('./src/config/mysqlConfig.js');
const session = require('express-session');
const path = require('path');

const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(Object.assign(mysqloption, { database: 'chat' }));

const app = express();
const router = require('./src/router.js');
const wsrouter = require('./src/wsrouter.js');

require('./src/module/createDatebase.js')(mysqloption).catch(e => {
    throw e;
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    secret: 'asdiuergnkswf',
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(morgan(':status :method :url :res[content-length] - :response-time ms'));

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

/* serve-libs */
app.use('/static/lib', express.static('src/libs'));

/* router */
app.use(router);
// app.use('/ws', wsrouter);

/* handle request */
app.get('/*', function(req, res) {
    res.render('index', { title: 'hello' });
});

/* eslint-disable */
const server = app.listen(8080, function() {
    console.log('namenone app listening on port 8080!');
});

wsrouter({ server, sessionStore });
