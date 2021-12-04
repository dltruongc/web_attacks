const express = require('express');

const app = express();

// database
const connection = require('./configs/db.config');

// set up engines
app.set('view engine', 'pug');

// Database injection
app.use((req, res, next) => {
  req.db = connection;

  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// >>> Routes configuration
// User route
app.use('/users', require('./users/user.route'));

// <<< Routes configuration

app.listen(3000, '0.0.0.0', function () {
  console.log('Web server runing!');
  console.log('👉: http://0.0.0.0:3000');
});
