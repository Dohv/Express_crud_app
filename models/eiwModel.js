const db = require('../db/config');

const Eiw = {};

Eiw.findAllExercisesByWorkoutId = id => {
  return db.query('SELECT exercises.name, workouts.name FROM exercises JOIN exercises_in_workouts ON exercises.id = exercises_in_workouts.exercises_id JOIN workouts ON exercises_in_workouts.workouts_id = workouts.id;WHERE workout_id = $1', [id]);
}



module.exports = Eiw;