// Steg 2.
// Importera modulen/komponenten
// const Movie = require('./modules/Movies');
import * as dotenv from 'dotenv';
import { getPopularMovies, findMovie } from './modules/movie-api.js';

dotenv.config();
// getPopularMovies().then((data) => console.log(data));
findMovie(640146).then((data) => console.log(data));
