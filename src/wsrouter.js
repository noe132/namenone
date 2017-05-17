let WebSocket = require('ws');
let cookieParser = require('cookie-parser');
let cookie = require('cookie');
let Router = require('./module/router.js');
let model = require('./model.js');

let router = new Router();

let message_operation = {
    send_message({ data, session, ws, wss }) {
        let to = data.to;
        let from = session.uid;
        let content = data.message;
        let date = new Date();
        // TODO insert
        model.insertchatlog({ from, to, content, date }).then(v => {
            if (v.affectedRows === 1) {
                wss.clients.forEach(v => {
                    if (v.upgradeReq.session.uid === to && v.readyState === WebSocket.OPEN) {
                        v.send(JSON.stringify({
                            type: 'message',
                            message: content,
                            from,
                        }));
                    }
                });
            }
        }).catch(e => {
            // TODO fail
            console.log(e);
        });
    }
};

module.exports = function({ server, sessionStore }) {
    const wss = new WebSocket.Server({
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
                message: 'data must be json string'
            }));
        }
        try {
            data = JSON.parse(msg);
        } catch (e) {
            ws.send(JSON.stringify({
                status: 1,
                message: 'json parse error'
            }));
        }

        if (!(data.req in message_operation)) {
            ws.send(JSON.stringify({
                status: 1,
                message: 'operation not defined'
            }));
            return;
        }
        try {
            message_operation[data.req]({ data, session, ws, wss });
        } catch (e) {
            ws.send(JSON.stringify({
                status: 1,
                message: 'operation erorr'
            }));
        }
    });
    ws.on('close', (code, reason) => {
        console.log(code, reason);
    });
});
