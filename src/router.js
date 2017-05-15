const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const model = require('./model.js');

router.use('/api', bodyParser.json());
router.use('/api', bodyParser.urlencoded({ extended: false }));

router.all('/api/islogin', function(req, res) {
    response({
        res,
        code: 200,
        status: 0,
        message: 'ok',
        obj: {
            logined: req.session.logined === true ? true : false
        }
    });
});

router.all('/api/signup', function(req, res) {
    model.signup({
        username: req.body.username,
        password: req.body.password
    }).then(v => {
        if (v.affectedRows === 1) {
            response({ res, code: 200, status: 0, message: 'signup successfully' });
        } else {
            response({ res, code: 200, status: 1, message: 'username in use' });
        }
    }).catch(e => {
        response({ res, code: 500, status: 1, message: e.toString() });
    });
});

router.all('/api/login', function(req, res) {
    model.login({
        username: req.body.username,
        password: req.body.password
    }).then(v => {
        if (v.length === 1) {
            req.session.logined = true;
            req.session.uid = v[0].uid;
            req.session.username = v[0].username;
            response({ res, code: 200, status: 0, message: 'login successfully' });
        } else {
            response({ res, code: 200, status: 1, message: 'incorrect username or password' });
        }
    }).catch(e => {
        response({ res, code: 500, status: 1, message: e.toString() });
    });
});

router.all('/api/logout', function(req, res) {
    req.session.destroy();
    response({ res, code: 200, status: 0, message: 'logout successfully' });
});

router.all('/api/friends', function(req, res) {
    if (!req.session.uid) {
        response({ res, code: 200, status: 1, message: 'not login' });
        return;
    }
    model.friends({
        uid: req.session.uid
    }).then(v => {
        response({ res, code: 200, status: 0, data: v });
    }).catch(e => {
        response({ res, code: 500, status: 1, message: e.toString() });
    });
});

router.all('/api*', (req, res) => {
    response({ res, code: 404, status: 1, message: '404' });
});


router.all('/api/addfriend', function(req, res) {
    if (!req.session.uid) {
        response({ res, code: 200, status: 1, message: 'not login' });
        return;
    }
    model.addfriend({
        uid: req.session.uid,
        username: req.body.fusername,
    }).then(v => {
        if (v.affectedRows === 2) {
            response({ res, code: 200, status: 0, message: 'add friend successfully' });
        } else {
            response({ res, code: 200, status: 1, message: 'friend already added' });
        }
    }).catch(e => {
        response({ res, code: 500, status: 1, message: e.toString() });
    });
});

router.all('/api/removefriend', function(req, res) {
    if (!req.session.uid) {
        response({ res, code: 200, status: 1, message: 'not login' });
        return;
    }
    model.removefriend({
        uid: req.session.uid,
        fuid: req.body.fuid,
    }).then(v => {
        if (v.affectedRows === 2) {
            response({ res, code: 200, status: 0, message: 'add friend successfully' });
        } else {
            response({ res, code: 200, status: 1, message: 'friend not exist' });
        }
    }).catch(e => {
        response({ res, code: 500, status: 1, message: e.toString() });
    });
});

router.all('/api*', (req, res) => {
    response({ res, code: 404, status: 1, message: '404' });
});



function response({ res, code, status, message, data, exobj }) {
    res.contentType('application/json');
    res.status(code);
    let obj = {
        status: status,
    };
    Object.assign(obj, exobj);
    if (message) {
        obj.message = message;
    }
    if (data) {
        obj.data = JSON.stringify(data);
    }
    res.send(JSON.stringify(obj));
}

module.exports = router;
