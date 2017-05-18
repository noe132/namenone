const mysqlQuery = require('./libs/mysqlPromiseQuery.js');

module.exports = {
    login({ username, password }) {
        return mysqlQuery('select * from user where username = ? and password = ?', [username, password]);
    },
    signup({ username, password }) {
        return mysqlQuery('insert into user set username = ?, password = ?, nickname = ?', [username, password, username]);
    },
    friends({ uid }) {
        return mysqlQuery('select friend.fid,friend.fuid as uid,user.username as name from friend,user where user.uid = friend.fuid and friend.uid = ?', [uid]);
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
    },
    chatlog({ uid, fuid }) {
        return mysqlQuery('SELECT * FROM `chatlog` where (uid = ? and fuid = ?) or (uid = ? and fuid = ?) order by date limit 10', [uid, fuid, fuid, uid]);
    }
};
