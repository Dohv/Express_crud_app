const Workout = require('../models/workoutModel');

const controller = {};

controller.index = (req, res) => {
  Workout.findAll()
    .then(workout => {
      res.render('workouts/workout-index', {
        documentTitle: 'Workout Planner',
        workoutData: workout,
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

controller.show = (req, res) => {
  Workout.findById(req.params.id)
    .then(workout => {
      console.log('in the controller');
      res.render('workouts/workout-single', {
        documentTitle: 'Workout Planner',
        workout: workout,
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

controller.create = (req, res) => {
  console.log('create function');
  //console.log(req.body);
  Workout.create({
    title: req.body.title,
    id: req.params.id,
  })
  .then(workout => {
    res.redirect('/workouts');
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
};

controller.edit = (req, res) => {
  console.log('edit function');
  Workout.findById(req.params.id)
  .then(workout => {
    console.log(workout[1].title);
    res.render('workouts/workout-edit', {
      documentTitle: "Workout Planner",
      workout: workout,
      id: req.params.id,
    });
  })
  .catch(err => {
    res.status(400).json(err);
  });
};

controller.update = (req, res) => {
  console.log('update function');
  Workout.update({
    title: req.body.title,
  }, req.params.id)
  .then(workout => {
    res.redirect('/workouts')
  })
  .catch(err => {
    res.status(400).json(err);
  });
};

controller.destroy = (req, res) => {
  Workout.destroy(req.params.id)
    .then(() => {
      res.redirect('/workouts');
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

module.exports = controller;