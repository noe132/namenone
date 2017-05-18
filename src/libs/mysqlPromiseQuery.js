const mysql = require('mysql');
const mysqloption = require('../config/mysqlConfig.js');

const promiseQuery = function(sql, arr) {
    return new Promise((rs, rj) => {
        let conn = mysql.createConnection(mysqloption);
        var prepared_sql = mysql.format(sql, arr);
        console.log(prepared_sql);
        conn.query(prepared_sql, (err, results) => {
            if (err) rj(err);
            rs(results);
        });
        conn.end();
    });
};

module.exports = promiseQuery;
