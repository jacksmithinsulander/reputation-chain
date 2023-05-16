const response = {
  status: 'Not found',
  statusCode: 404,
  data: null,
  error: null,
};

exports.listMovies = (req, res) => {
  // Logik för att hämta alla filmerna...
  // Svaret har kommit tillbaka någonstans ifrån...
  response.status = 'Success';
  response.statusCode = 200;
  response.data = 'Hämtar filmer';
  res.status(response.statusCode).json(response);
};

exports.findMovie = (req, res) => {
  response.status = 'Success';
  response.statusCode = 200;
  response.data = `Hittade filmen med id ${req.params.id}`;
  res.status(response.statusCode).json(response);
};

exports.addMovie = (req, res) => {
  response.status = 'Success';
  response.statusCode = 201;
  response.data = req.body;
  res.status(response.statusCode).json(response);
};

exports.updateMovie = (req, res) => {
  // Vi får inte glömma att vi får in ett id...
  response.status = 'Success';
  response.statusCode = 204;
  res.status(response.statusCode).json(response);
};

exports.changeMovieTitle = (req, res) => {
  // Vi får inte glömma att vi får in ett id...
  response.status = 'Success';
  response.statusCode = 204;
  res.status(response.statusCode).json(response);
};

exports.removeMovie = (req, res) => {
  // Vi får inte glömma att vi får in ett id...
  response.status = 'Success';
  response.statusCode = 204;
  res.status(response.statusCode).json(response);
};
