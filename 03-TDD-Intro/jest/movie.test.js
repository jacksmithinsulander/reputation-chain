const Movie = require('./Movie');

describe('Movie', () => {
  // Arrange...
  const id = 1;
  const title = 'The Batman';
  const releaseYear = 2022;
  const description = 'Filmens beskrivning';

  const movie = new Movie(1, title, releaseYear, description);

  it('should have an id', () => {
    expect(movie.movieId).toEqual(id);
  });

  it('should have a title', () => {
    expect(movie.title).toEqual(title);
  });

  it('should have the release year', () => {
    expect(movie.releaseYear).toEqual(releaseYear);
  });

  it('should have an overview of the plot', () => {
    expect(movie.description).toEqual(description);
  });

  // Act...
  it('should return an instance of Movie ', () => {
    // Assertion(testets resultat)...
    // Act                          // Assertion
    expect(movie instanceof Movie).toBe(true);
  });
});
