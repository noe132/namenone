const express = require('express');
const browserify = require('browserify-middleware');
const lessMiddleware = require('less-middleware');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(favicon(path.join(__dirname, '/src/asserts/', 'favicon.ico')));

// complie less
app.use('/static/css/', lessMiddleware(__dirname + '/src/less/', {
    dest: __dirname + '/static/css/'
}));

// browserify js
app.use('/static/js/main.js', browserify(__dirname + '/src/main.js', {
    transform: ['vueify']
}));

app.use('/static/img', express.static('/asserts/img'));

app.get('/*', function(req, res) {
    res.render('index', { title: 'hello' });
});

app.listen(8080, function() {
    console.log('Example app listeningon port 8080!');
});
