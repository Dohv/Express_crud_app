const db = require('../db/config');

const Exercise = {};

Exercise.findAll = () => {
  return db.query('SELECT * FROM exercises ORDER BY id ASC');
};

Exercise.findById = id => {
  return db.oneOrNone('SELECT * FROM exercises WHERE id = $1', [id]);
};

Exercise.create = exercise => {
  return db.one(
    `
    INSERT INTO exercises
    (name)
    VALUES($1) RETURNING *
    `,
    [exercise.name]
  );
};

Exercise.update = (exercise, id) => {
  return db.none(
    `
    UPDATE exercises SET
    name = $1
    WHERE id = $2
    `,
    [exercise.name, id]
  );
};

Exercise.destroy = id => {
  return db.none(
    `
    DELETE FROM exercises_in_workouts WHERE exercises_id = $1;
    DELETE FROM exercises WHERE id = $1
    `,
    [id]
  );
};

module.exports = Exercise;