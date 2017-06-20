const db = require('../db/config');

const Workout = {};



Workout.findAll = () => {
  return db.query('Select * FROM workouts ORDER BY id ASC');
};

Workout.findById = id => {
  return db.query(
    `SELECT workouts.title, exercises.name 
    FROM exercises 
    JOIN exercises_in_workouts ON exercises.id = exercises_in_workouts.exercises_id 
    JOIN workouts ON exercises_in_workouts.workouts_id = workouts.id 
    WHERE workouts.id = $1`, [id]
    )
};



Workout.create = (workout) => {
  return db.one(
    `
    INSERT INTO workouts
    (title)
    VALUES($1) RETURNING id
    ` ,
    [workout.title, workout.id]
  )
};

Workout.findBywoId 

Workout.update = (workout, id) => {
  return db.none(
    `
    UPDATE workouts SET
    title = $1
    WHERE id = $2
    `,
    [workout.title, id]
  );
};

Workout.destroy = id => {
  return db.none(
    `
    DELETE FROM exercises_in_workouts WHERE workouts_id = $1;
    DELETE FROM workouts WHERE id = $1
    `,
    [id]
  );
};

module.exports =  Workout;