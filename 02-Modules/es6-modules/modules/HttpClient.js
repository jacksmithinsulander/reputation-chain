// const config = require('./config');

class HttpClient {
  api_key = process.env.API_KEY;
  url = process.env.BASEURL;

  listPopularMovies = async () => {
    // const api_key = 'b6db108c656743b50fe39afcc3bffcc7';
    // const baseUrl = 'https://api.themoviedb.org/3/';
    // const api_key = config.api.key;
    // const url = config.api.baseUrl;
    // const api_key = process.env.API_KEY;
    // const url = process.env.BASEURL;

    // console.log(process.env.BASEURL);
    // console.log(process.env.API_KEY);

    const response = await fetch(
      `${this.url}movie/popular?api_key=${this.api_key}&language=sv-SE`
    );

    const { results } = await response.json();
    return results;
  };

  getMovie = async (endpoint) => {
    // const api_key = 'b6db108c656743b50fe39afcc3bffcc7';
    // const baseUrl = 'https://api.themoviedb.org/3/';
    // const api_key = config.api.key;
    // const url = config.api.baseUrl;

    // const api_key = process.env.API_KEY;
    // const url = process.env.BASEURL;
    const response = await fetch(
      `${this.url}${endpoint}?api_key=${this.api_key}&language=sv-SE`
    );

    const movie = await response.json();
    return movie;
  };
}

module.exports = HttpClient;
