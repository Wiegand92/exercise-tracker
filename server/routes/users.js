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
    .catch(err => res.status(400).json({error: err}));
});

router.route('/login').post(async (req, res) => {
  const {username, password} = req.body;

  const user = await User.findOne({username});

  if (!user) {
    return res.status(404).json({error: 'User not found'});
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (matchPassword) {
    const token = jwt.sign({name: user.username}, 'secret123');
    return res.json({status: 'ok', auth: token, user: user.username});
  } else {
    return res.status(401).json({error: 'Password does not match'});
  }
});

module.exports = router;
