const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6681456',
  password: 'S8YftCGSyj',
  database: 'sql6681456',
  port: 3306,
  connectionLimit: 10, 
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

module.exports = connection;
