class Movie {
  constructor(movieId, title, releaseYear, description) {
    this.movieId = movieId;
    this.title = title;
    this.releaseYear = releaseYear;
    this.description = description;
  }
}

// Steg 1. Exportera klassen
// Publicerat ett interface...
module.exports = Movie;
