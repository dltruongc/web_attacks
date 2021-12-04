module.exports = {
  findOneByUsername: (username) =>
    `SELECT * FROM users WHERE username='${username}'`,
};
