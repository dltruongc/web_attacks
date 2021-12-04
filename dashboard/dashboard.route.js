const userQuery = require('../users/user.query');

const router = require('express').Router();

router.get('/', function (req, res, next) {
  const connection = req.db;
  const { username, password } = req.query;

  connection.query(
    userQuery.findOneByUsername(username),
    function (error, data) {
      if (error) {
        return res.json({ message: 'An error occured!' });
      }
      if (data.length === 0 || data[0].password !== password) {
        return res.render('errors/unauthorized');
      }

      if (data[0].role.trim().toLocaleUpperCase() !== 'ADMIN') {
        return res.render('errors/permission');
      }

      return res.render('dashboard');
    }
  );
});

module.exports = router;
