let ws = require('ws');
let cookieParser = require('cookie-parser');
let cookie = require('cookie');
let Router = require('./module/router.js');

let router = new Router();

module.exports = function({ server, sessionStore }) {
    const wss = new ws.Server({
        server,
        clientTracking: true
    });
    wss.on('connection', function connection(ws) {
        let req = ws.upgradeReq;
        let cookies = cookie.parse(req.headers.cookie);
        let sid = cookieParser.signedCookie(cookies['connect.sid'], 'asdiuergnkswf');
        sessionStore.get(sid, function(err, ss) {
            if (err) ws.close();
            sessionStore.createSession(ws.upgradeReq, ss);
            if (!router.match(ws.upgradeReq.url, ws, wss)) {
                ws.close();
            }
        });
    });
};

router.ws('/ws', (ws, wss) => {
    ws.on('message', function(msg) {
        let req = ws.upgradeReq;
        let session = req.session;
        let data;

        if (typeof msg !== 'string') {
            ws.send(JSON.stringify({
                status: 1,
                error: 'data must be json string'
            }));
        }
        try {
            data = JSON.parse(msg);
        } catch (e) {
            ws.send(JSON.stringify({
                status: 1,
                error: 'json parse error'
            }));
        }

        ws.send(session.uid, msg);
    });
    ws.on('close', (code, reason) => {
        console.log(code, reason);
    });
});
