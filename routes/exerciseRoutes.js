const express = require('express');
const controller = require('../controllers/exerciseController');

const exerciseRoutes = express.Router();


exerciseRoutes.get('/', controller.index);
exerciseRoutes.get('/add', (req, res) => {
  res.render('exercises/exercise-add', {
    documentTitle: 'Workout Planner',
  });
});
exerciseRoutes.get('/edit/:id', controller.edit);
exerciseRoutes.get('/:id', controller.show);
exerciseRoutes.post('/', controller.create);
exerciseRoutes.put('/:id', controller.update);
exerciseRoutes.delete('/:id', controller.destroy);

module.exports = exerciseRoutes;

