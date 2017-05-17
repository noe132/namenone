const mysqlQuery = require('./libs/mysqlPromiseQuery.js');

module.exports = {
    login({ username, password }) {
        return mysqlQuery('select * from user where username = ? and password = ?', [username, password]);
    },
    signup({ username, password }) {
        return mysqlQuery('insert into user set username = ?, password = ?, nickname = ?', [username, password, username]);
    },
    friends({ uid }) {
        return mysqlQuery('select * from friend where uid = ?', [uid]);
    },
    addfriend({ uid, username }) {
        return mysqlQuery('INSERT INTO friend (fid,uid,fuid) VALUES ' +
            '(null,?,(select uid from user where username = ?)), (null,(select uid from user where username = ?),?)', [uid, username, username, uid]);
    },
    removefriend({ uid, fuid }) {
        return mysqlQuery('DELETE FROM `friend` WHERE (uid = ? and fuid = ?) or (uid = ? and fuid = ?)', [uid, fuid, fuid, uid]);
    },
    insertchatlog({ from, to, content, date }) {
        return mysqlQuery('insert into chatlog set uid = ?, fuid = ?, message = ?, date = ?', [from, to, content, date]);
    }
};
