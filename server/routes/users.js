const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post(async (req, res) => {
  const {username, password} = req.body;

  const newPassword = await bcrypt.hash(password, 10);

  const newUser = new User({username, password: newPassword});

  newUser
    .save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/login').post(async (req, res) => {
  const {username, password} = req.body;

  const user = await User.findOne({username});

  const matchPassword = await bcrypt.compare(password, user.password);
  console.log(matchPassword);

  if (matchPassword) {
    const token = jwt.sign({name: user.username}, 'secret123');
    return res.json({status: 'ok', auth: token, user: user.username});
  } else {
    return res.json({status: 'error', user: false});
  }
});

module.exports = router;
