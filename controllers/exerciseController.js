const Exercise = require('../models/exerciseModel');

const controller = {};

controller.index = (req, res) => {
  Exercise.findAll()
    .then(exercises => {
      res.render('exercises/exercise-index', {
        documentTitle: 'Workout Planner',
        exerciseData: exercises,
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

controller.show = (req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      res.render('exercises/exercise-single', {
        documentTitle: 'Workout Planner',
        exercise: exercise,
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

controller.create = (req, res) => {
  Exercise.create({
    name: req.body.name,
  })
  .then(exercise => {
    res.redirect('/exercises');
  })
  .catch(err => {
    res.status(400).json(err);
  });
};

controller.edit = (req, res) => {
  Exercise.findById(req.params.id)
  .then(exercise => {
    res.render('exercises/exercise-edit', {
      documentTitle: "Workout Planner",
      exercise: exercise,
      id: req.params.id,
    });
  })
  .catch(err => {
    res.status(400).json(err);
  });
};

controller.update = (req, res) => {
  Exercise.update({
    name: req.body.name,
  }, req.params.id)
  .then(exercise => {
    res.redirect('/exercises')
  })
  .catch(err => {
    res.status(400).json(err);
  });
};

controller.destroy = (req, res) => {
  Exercise.destroy(req.params.id)
    .then(() => {
      res.redirect('/exercises');
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

module.exports = controller;