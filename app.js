const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

const exerciseRoutes = require('./routes/exerciseRoutes');
const workoutRoutes = require('./routes/workoutRoutes');


const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Linsten on port ${PORT}`);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.get('/', function(req, res) {
  res.render('index', {
    message: 'Welcome to Workout Planner',
    documentTitle: 'Workout Planner',
    subTitle: 'Plan ahead to make your workout as productive as possible!',
    showMore: true,
  });
});


app.use('/exercises', exerciseRoutes);

app.use('/workouts', workoutRoutes);



app.get('*', function (req, res) {
  res.status(404).send({message: 'Oops! Something went wrong!'})
});