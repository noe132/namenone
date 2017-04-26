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

app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.use('/static/css/', lessMiddleware(__dirname + '/static/less/', {
    dest: __dirname + '/static/css/'
}));
app.use('/static/js/', browserify(__dirname + '/static/js/', {
    transform: ['vueify']
}));
app.use('/static/', express.static('static'));

app.get('/*', function(req, res) {
    res.render('index', { title: 'hello' });
});

app.listen(8080, function() {
    console.log('Example app listeningon port 8080!');
});
