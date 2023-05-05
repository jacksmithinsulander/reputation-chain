import Movie from './Movies.js';

const HttpClient = require('./HttpClient');

const getPopularMovies = async () => {
  // const api_key = 'b6db108c656743b50fe39afcc3bffcc7';
  // const baseUrl = 'https://api.themoviedb.org/3/';

  // const response = await fetch(
  //   `${baseUrl}movie/popular?api_key=${api_key}&language=sv-SE`
  // );

  // const { results } = await response.json();

  const http = new HttpClient();

  const results = await http.listPopularMovies();

  const movies = results.map(
    (movie) =>
      new Movie(movie.id, movie.title, movie.release_date, movie.overview)
  );

  return movies;
};

const findMovie = async (id) => {
  // const api_key = 'b6db108c656743b50fe39afcc3bffcc7';
  // const baseUrl = 'https://api.themoviedb.org/3/';

  // const response = await fetch(
  //   `${baseUrl}movie/${id}?api_key=${api_key}&language=sv-SE`
  // );

  // const movie = await response.json();
  const http = new HttpClient();

  const movie = http.getMovie(`movie/${id}`);
  return movie;
};

export { getPopularMovies, findMovie };
