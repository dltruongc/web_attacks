const router = require('express').Router();
const queries = require('./user.query');

router.get('/login', function (req, res, next) {
  return res.render('login');
});

// Attack: Brute force
router.post('/', function (req, res, next) {
  const connection = req.db;

  const payload = req.body;

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

module.exports = router;
