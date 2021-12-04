const router = require('express').Router();
const queries = require('./user.query');

router.get('/login', function (req, res, next) {
  return res.render('login');
});

// Attack: Brute force
router.post('/', function (req, res, next) {
  const connection = req.db;

  const payload = req.body;
  console.log(payload);

  connection.query(
    queries.findOneByUsername(payload.username),
    function (error, data) {
      if (error) {
        return res.json({ message: 'No user found!' });
      }

      if (data[0].password !== payload.password) {
        return res.json({ message: 'Incorrect login credentials!' });
      }
      return res.json({ data: data[0] });
    }
  );
});

// SQL Injection attack
router.get('/sql', function (req, res, next) {
  const connection = req.db;

  const { username, password } = req.query;

  const queryObj = { username, password };

  const queryString = Object.keys(queryObj)
    .map((key) => {
      if (queryObj[key]) {
        if (!isNaN(queryObj[key])) {
          return `${key} = ${queryObj[key]}`;
        }
        return `${key} = '${queryObj[key]}'`;
      }
    })
    .join(' AND ');

  console.log('Query: ', `SELECT * FROM users WHERE ${queryString}`);

  connection.query(
    `SELECT * FROM users WHERE ${queryString}`,
    function (error, data) {
      if (error) {
        return res.json({ message: 'No user found!' });
      }

      return res.render('sql_injection', { data: JSON.stringify(data) });
    }
  );
});

// XSS attack
router.get('/xss', function (req, res, next) {
  const { script } = req.query;

  console.log(script);

  return res.render('xss', { script });
});

module.exports = router;
