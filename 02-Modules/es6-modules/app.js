// Steg 2.
// Importera modulen/komponenten
// const Movie = require('./modules/Movies');
require('dotenv').config();
const { getPopularMovies, findMovie } = require('./modules/movie-api');
// getPopularMovies().then((data) => console.log(data));
findMovie(640146).then((data) => console.log(data));
