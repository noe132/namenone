module.exports = option => {
    return new Promise((rs, rj) => {
        const mysql = require('mysql');
        const connection = mysql.createConnection(option);

        const sql = [
            'CREATE DATABASE IF NOT EXISTS `chat` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci',
            'CREATE TABLE IF NOT EXISTS `user` ( `id` INT NOT NULL AUTO_INCREMENT , `username` VARCHAR(32) NOT NULL , `password` VARCHAR(32) NOT NULL , `nickname` VARCHAR(128) NOT NULL , PRIMARY KEY (`id`), UNIQUE (`username`))'
        ];

        connection.connect();

        sql.forEach(v => {
            connection.query(v, function(error) {
                if (error) throw error;
            });
        });
        connection.end();
    });
};
