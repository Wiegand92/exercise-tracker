const router = require('express').Router();
let Exercise = require('../models/exercise.model');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const token = req.headers['x-access-token'];
  const decoded = !!token ? jwt.verify(token, 'secret123') : false;

  if (!!decoded) {
    const username = decoded.name;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = dayjs(req.body.date);

    const newExercise = new Exercise({
      username,
      description,
      duration,
      date,
    });

    newExercise
      .save()
      .then(() => res.json('Exercise added!'))
      .catch(err => res.status(400).json(`Error: ${err}`));
  } else {
    res.status(400).json('You are not logged in!');
  }
});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete(async (req, res) => {
  const token = req.headers['x-access-token'];

  const decoded = jwt.verify(token, 'secret123');

  const exercise = await Exercise.findById(req.params.id);

  if (exercise.username === decoded.name) {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.'))
      .catch(err => res.status(400).json(`Error: ${err}`));
  } else {
    res.status(400).json('Error: This is not your card!');
  }
});

router.route('/update/:id').post((req, res) => {
  const token = req.headers['x-access-token'];

  const decoded = jwt.verify(token, 'secret123');

  Exercise.findById(req.params.id)
    .then(exercise => {
      if (exercise.username === decoded.name) {
        console.log(req.body.date);
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = dayjs(req.body.date);

        exercise
          .save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json(`Error: ${err}`));
      } else {
        res.status(400).json('Error: Error invalid user');
      }
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
