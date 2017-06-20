
DROP DATABASE workout_planner;
CREATE DATABASE workout_planner;
\c workout_planner;

DROP TABLE IF EXISTS exercises_in_workouts CASCADE;
DROP TABLE IF EXISTS exercises CASCADE;
DROP TABLE IF EXISTS workouts CASCADE;



CREATE TABLE exercises(
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);



CREATE TABLE workouts(
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);



CREATE TABLE exercises_in_workouts(
  exercises_id INTEGER REFERENCES exercises(id),
  workouts_id INTEGER REFERENCES workouts(id),
  reps INTEGER DEFAULT 0 NOT NULL,
  sets INTEGER DEFAULT 0 NOT NULL
);
