const express = require('express');
const router = express.Router();

const {
  listMovies,
  findMovie,
  updateMovie,
  changeMovieTitle,
  removeMovie,
  addMovie,
} = require('../controllers/movies-controller');

router.route('/').get(listMovies).post(addMovie);
router
  .route('/:id')
  .get(findMovie)
  .put(updateMovie)
  .patch(changeMovieTitle)
  .delete(removeMovie);

module.exports = router;
