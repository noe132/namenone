module.exports = option => {
    const mysql      = require('mysql');
    const connection = mysql.createConnection(option);

    const create_database_sql = 'CREATE DATABASE IF NOT EXISTS `chat` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';

    connection.connect();

    connection.query(create_database_sql, function (error) {
        if (error) throw error;
    });

    connection.end();
};
