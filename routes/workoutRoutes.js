const express = require('express');
const controller = require('../controllers/workoutController');

const workoutRoutes = express.Router();


workoutRoutes.get('/', controller.index);
workoutRoutes.get('/add', (req, res) => {
  res.render('workouts/workout-add', {
    documentTitle: 'Workout Planner',
  });
});
workoutRoutes.get('/edit/:id', controller.edit);
workoutRoutes.get('/:id', controller.show);
workoutRoutes.post('/', controller.create);
workoutRoutes.put('/:id', controller.update);
workoutRoutes.delete('/:id', controller.destroy);

module.exports = workoutRoutes;
