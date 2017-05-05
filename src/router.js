const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const model = require('./model.js');

router.use('/api', bodyParser.json());
router.use('/api', bodyParser.urlencoded({ extended: false }));

router.all('/api/islogin', function(req, res) {
    res.contentType('application/json');
    res.status(200);
    res.send(JSON.stringify({
        status: 0,
        logined: req.session.logined === true ? true : false,
    }));
});

router.all('/api/signup', function(req, res) {
    res.contentType('application/json');
    model.signup({
        username: req.body.username,
        password: req.body.password
    }).then(v => {
        res.status(200);
        if (v.affectedRows === 1) {
            res.send(JSON.stringify({
                status: 0,
                message: 'signup successfully'
            }));
        } else {
            res.send(JSON.stringify({
                status: 1,
                message: 'username in use'
            }));
        }
    }).catch(e => {
        res.status(500);
        res.send(JSON.stringify({
            status: 1,
            message: 'internal server error',
            error_message: e.toString()
        }));
    });
});

router.all('/api/login', function(req, res) {
    res.contentType('application/json');
    model.login({
        username: req.body.username,
        password: req.body.password
    }).then(v => {
        res.status(200);
        if (v.length === 1) {
            req.session.logined = true;
            req.session.uid = v[0].uid;
            req.session.username = v[0].username;
            res.send(JSON.stringify({
                status: 0,
                message: 'login successfully',
            }));
        } else {
            res.send(JSON.stringify({
                status: 1,
                message: 'incorrect username or password'
            }));
        }
    }).catch(e => {
        res.status(500);
        res.send(JSON.stringify({
            status: 1,
            message: 'internal server error',
            error_message: e.toString()
        }));
    });
});

router.all('/api/logout', function(req, res) {
    req.session.destroy();
    res.contentType('application/json');
    res.send(JSON.stringify({
        status: 0,
        message: 'logout successfully'
    }));
});

router.all('/api*', (req, res) => {
    res.contentType('application/json');
    res.status(404);
    res.send(JSON.stringify({
        status: 1,
        message: '404'
    }));
});

module.exports = router;
