class HttpClient {
  api_key = process.env.API_KEY;
  url = process.env.BASEURL;

  listPopularMovies = async () => {
    const response = await fetch(
      `${this.url}movie/popular?api_key=${this.api_key}&language=sv-SE`
    );

    const { results } = await response.json();
    return results;
  };

  getMovie = async (endpoint) => {
    const response = await fetch(
      `${this.url}${endpoint}?api_key=${this.api_key}&language=sv-SE`
    );

    const movie = await response.json();
    return movie;
  };
}

export default HttpClient;
