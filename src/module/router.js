module.exports = class Router {
    constructor() {
        this.store = [];
    }
    ws(path, cb) {
        this.store.push({ path, cb });
    }
    match(path, ws, wss) {
        for (let x of this.store) {
            if (path.indexOf(x.path) === 0) {
                x.cb(ws, wss);
                return true;
            }
        }
        return false;
    }
};
