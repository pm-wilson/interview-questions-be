const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/questions', require('./controllers/questions'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
