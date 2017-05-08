const express = require('express');
const router = express.Router();
require('express-ws')(router);

router.ws('/', function(ws, req) {
    ws.on('message', (msg) => {
        console.log(msg);
        ws.send(msg);
    });
});

module.exports = router;
