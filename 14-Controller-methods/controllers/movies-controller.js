const response = {
  status: 'Not found',
  statusCode: 404,
  data: null,
  error: null,
};

exports.listMovies = async (req, res) => {
  const result = await fetch(process.env.BASE_API_URL);
  const movies = await result.json();
  response.logger = req.logger;
  response.status = 'Success';
  response.statusCode = 200;
  response.data = movies;
  res.status(response.statusCode).json(response);
};

exports.findMovie = async (req, res) => {
  const url = `${process.env.BASE_API_URL}/${req.params.id}`;
  const result = await fetch(url);
  const movie = await result.json();
  response.status = 'Success';
  response.statusCode = 200;
  response.data = movie;
  res.status(response.statusCode).json(response);
};

exports.addMovie = async (req, res) => {
  response.status = 'Success';
  response.statusCode = 201;
  response.data = null;

  const result = await fetch(process.env.BASE_API_URL, {
    method: 'POST', //http verbet...
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  });

  const movie = await result.json();
  response.data = movie;

  res.status(response.statusCode).json(response);
};

exports.updateMovie = async (req, res) => {
  response.status = 'Success';
  response.statusCode = 204;

  await fetch(`${process.env.BASE_API_URL}/${req.params.id}`, {
    method: 'PUT', //http verbet...
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(),
  });
  res.status(response.statusCode).send();
};

exports.changeMovieTitle = async (req, res) => {
  // Vi får inte glömma att vi får in ett id...
  response.status = 'Success';
  response.statusCode = 204;

  const data = req.body;

  await fetch(`${process.env.BASE_API_URL}/${req.params.id}`, {
    method: 'PATCH', //http verbet...
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  });

  res.status(response.statusCode).send();
};

exports.removeMovie = async (req, res) => {
  // Vi får inte glömma att vi får in ett id...
  response.status = 'Success';
  response.statusCode = 204;

  await fetch(`${process.env.BASE_API_URL}/${req.params.id}`, {
    method: 'DELETE', //http verbet...
  });
  res.status(response.statusCode).send();
};
