const axios = require('axios');

const response = {
  status: 'Not found',
  statusCode: 404,
  data: null,
  error: null,
};

exports.listMovies = async (req, res) => {
  const { data } = await axios.get(process.env.BASE_API_URL);

  response.status = 'Success';
  response.statusCode = 200;
  response.data = data;
  res.status(response.statusCode).json(response);
};

exports.findMovie = async (req, res) => {
  const url = `${process.env.BASE_API_URL}/${req.params.id}`;
  const { data } = await axios.get(url);
  response.status = 'Success';
  response.statusCode = 200;
  response.data = data;
  res.status(response.statusCode).json(response);
};

exports.addMovie = async (req, res) => {
  response.status = 'Success';
  response.statusCode = 201;
  response.data = null;

  const { data } = await axios.post(process.env.BASE_API_URL, req.body);
  response.data = data;
  res.status(response.statusCode).json(response);
};

exports.updateMovie = async (req, res) => {
  response.status = 'Success';
  response.statusCode = 204;

  await axios.put(`${process.env.BASE_API_URL}/${req.params.id}`, req.body);
  res.status(response.statusCode).send();
};

exports.changeMovieTitle = async (req, res) => {
  // Vi får inte glömma att vi får in ett id...
  response.status = 'Success';
  response.statusCode = 204;

  await axios.patch(`${process.env.BASE_API_URL}/${req.params.id}`, req.body);

  res.status(response.statusCode).send();
};

exports.removeMovie = async (req, res) => {
  response.status = 'Success';
  response.statusCode = 204;

  await axios.delete(`${process.env.BASE_API_URL}/${req.params.id}`);
  res.status(response.statusCode).send();
};
