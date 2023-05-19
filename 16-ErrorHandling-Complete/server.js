const express = require('express');
const dotenv = require('dotenv');
const movies = require('./routes/movie-routes');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utilities/AppError');

dotenv.config({ path: './config/config.env' });

const app = express();

// Middleware...
app.use(express.json());
app.use('/api/1/movies', movies);

// CatchAll
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Couldn't find ${req.originalUrl}, did you misspell the url?`,
      404
    )
  );
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
