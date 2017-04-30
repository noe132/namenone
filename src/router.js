const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use('/api', bodyParser.json());

router.post('/api/login', function(req, res) {
    const session = req.session;
});

router.post('/api/logout', function(req, res) {
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
