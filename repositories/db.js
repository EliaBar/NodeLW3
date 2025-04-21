const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'karamelka657',
  database: 'students_db',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
