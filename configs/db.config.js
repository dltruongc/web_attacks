var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  // port: 3306
  user: 'root',
  password: 'password',
  database: 'websercurity',
});

connection.connect(function (error, sucess) {
  if (error) {
    console.error('💥 Database cannot establish a new connection!');
    console.error(error);
  }

  console.log('👌 Database connect successed!');
});

module.exports = connection;
