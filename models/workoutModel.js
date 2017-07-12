const db = require('../db/config');

const Workout = {};



Workout.findAll = () => {
  return db.query('Select * FROM workouts ORDER BY id ASC');
};

Workout.findById = id => {
  return db.tx(t => {
    // creating a sequence of transaction queries:
    const q1 = t.any(
      `SELECT exercises.name 
      FROM exercises 
      JOIN exercises_in_workouts ON exercises.id = exercises_in_workouts.exercises_id 
      WHERE exercises_in_workouts.workouts_id = $1`, [id]);
    const q2 = t.one(`SELECT workouts.title FROM workouts where id = $1`, [id]);

    // returning a promise that determines a successful transaction:
    return t.batch([q1, q2]); // all of the queries are to be resolved;
})
    .then(data => {
        console.log(data); // printing successful transaction output;
        return data;
    })
    .catch(error => {
        console.log(error); // printing the error;
    });
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

// Workout.findBywoId 

Workout.update = (workout, id) => {
  console.log(workout);
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