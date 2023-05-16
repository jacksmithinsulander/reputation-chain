const express = require('express');
const dotenv = require('dotenv');
const movies = require('./routes/movie-routes');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());

app.use('/api/1/movies', movies);

const PORT = process.env.PORT || 5010;

app.listen(
  PORT,
  console.log(
    `Server är igång på port: ${PORT} och kör i ${process.env.NODE_ENV} läge`
  )
);
