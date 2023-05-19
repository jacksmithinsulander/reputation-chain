const express = require('express');
const dotenv = require('dotenv');
const movies = require('./routes/movie-routes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config({ path: './config/config.env' });

const app = express();

// Middleware...
app.use(express.json());
app.use('/api/1/movies', movies);

// CatchAll
app.all('*', (req, res, next) => {
  const err = new Error(
    `Couldn't find ${req.originalUrl}, did you misspell the url?`
  );
  (err.status = 'Not Found'), (err.statusCode = 404);

  next(err);
});

// Global ErrorHandler...
app.use(errorHandler);

const PORT = process.env.PORT || 5010;

app.listen(
  PORT,
  console.log(
    `Server är igång på port: ${PORT} och kör i ${process.env.NODE_ENV} läge`
  )
);
