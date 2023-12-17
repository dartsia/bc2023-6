const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'darchyykdemib0y',
    database: 'device_rental',
});

connection.connect((err) => {
    if (err) {
      console.error('Помилка підключення до бази даних: ' + err.stack);
      return;
    }
    console.log('Підключено до бази даних з id ' + connection.threadId);
});

module.exports = connection;

