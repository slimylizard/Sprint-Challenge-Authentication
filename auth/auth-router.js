const router = require('express').Router();
const Users = require('../database/user-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../database/secrets.js')

function generateToken(user) {
  const payload = {
    username: user.name,
    id: user.id,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  Users.insert({ username, password: bcrypt.hashSync(password, 10) })
    .then(id => {
      res.status(200).json({ message: 'Registration succesfull', id })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: 'error registering user' })
    })  
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  Users.findByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        req.status(200).json({
          message: 'Welcome Dave',
          token 
        });
      } else {
        res.status(500).json({ Error: 'invalid credentials' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: 'Error registering' })
    }) 
});

module.exports = router;
