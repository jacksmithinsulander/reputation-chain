// Steg 2.
// Importera modulen/komponenten
// const Movie = require('./modules/Movies');
require('dotenv').config();
const { getPopularMovies, findMovie } = require('./modules/movie-api');
// class Movie {
//   constructor(movieId, title, releaseYear, description) {
//     this.movieId = movieId;
//     this.title = title;
//     this.releaseYear = releaseYear;
//     this.description = description;
//   }
// }

// const getPopularMovies = async () => {
//   const api_key = 'b6db108c656743b50fe39afcc3bffcc7';
//   const baseUrl = 'https://api.themoviedb.org/3/';

//   const response = await fetch(
//     `${baseUrl}movie/popular?api_key=${api_key}&language=sv-SE`
//   );

//   const { results } = await response.json();

//   const movies = results.map(
//     (movie) =>
//       new Movie(movie.id, movie.title, movie.release_date, movie.overview)
//   );

//   console.log(movies);
// };

// const getMovie = async (id) => {
//   const api_key = 'b6db108c656743b50fe39afcc3bffcc7';
//   const baseUrl = 'https://api.themoviedb.org/3/';

//   const response = await fetch(
//     `${baseUrl}movie/${id}?api_key=${api_key}&language=sv-SE`
//   );

//   const { results } = await response.json();
//   console.log('Hämta en film');
// };

// getPopularMovies().then((data) => console.log(data));

findMovie(640146).then((data) => console.log(data));
