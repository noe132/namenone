const mysqlQuery = require('./libs/mysqlPromiseQuery.js');

module.exports = {
    login({ username, password }) {
        return mysqlQuery('select * from user where username = ? and password = ?', [username, password]);
    },
    signup({ username, password }) {
        return mysqlQuery('insert into user set username = ?, password = ?, nickname = ?', [username, password, username]);
    }
};
