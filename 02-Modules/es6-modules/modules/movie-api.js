import { Movie } from './Movies.js';
import HttpClient from './HttpClient.js';

const getPopularMovies = async () => {
  const http = new HttpClient();

  const results = await http.listPopularMovies();

  const movies = results.map(
    (movie) =>
      new Movie(movie.id, movie.title, movie.release_date, movie.overview)
  );

  return movies;
};

const findMovie = async (id) => {
  const http = new HttpClient();
  const movie = http.getMovie(`movie/${id}`);
  return movie;
};

export { getPopularMovies, findMovie };
