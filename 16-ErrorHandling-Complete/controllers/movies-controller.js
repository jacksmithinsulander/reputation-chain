const axios = require('axios');
const catchErrorAsync = require('../utilities/catchErrorAsync');
const AppError = require('../utilities/AppError');

const response = {
  status: 'Not found',
  statusCode: 404,
  data: null,
  error: null,
};

exports.listMovies = catchErrorAsync(async (req, res) => {
  const { data } = await axios.get(process.env.BASE_API_URL);
  response.status = 'Success';
  response.statusCode = 200;
  response.data = data;
  res.status(response.statusCode).json(response);
});

exports.findMovie = catchErrorAsync(async (req, res) => {
  const url = `${process.env.BASE_API_URL}/${req.params.id}`;
  const { data } = await axios.get(url);
  response.status = 'Success';
  response.statusCode = 200;
  response.data = data;
  res.status(response.statusCode).json(response);
});

exports.addMovie = catchErrorAsync(async (req, res) => {
  if (!Object.keys(req.body).length) throw new AppError('No data sent!', 400);
  if (!req.body.title || !req.body.title.length > 0)
    throw new AppError('Title is missing!', 400);

  response.status = 'Success';
  response.statusCode = 201;
  response.data = null;

  const { data } = await axios.post(process.env.BASE_API_URL, req.body);
  response.data = data;
  res.status(response.statusCode).json(response);
});

exports.updateMovie = catchErrorAsync(async (req, res) => {
  response.status = 'Success';
  response.statusCode = 204;

  await axios.put(`${process.env.BASE_API_URL}/${req.params.id}`, req.body);
  res.status(response.statusCode).send();
});

exports.changeMovieTitle = catchErrorAsync(async (req, res) => {
  if (!Object.keys(req.body).length) throw new AppError('No data sent!', 400);
  if (!req.body.title || !req.body.title.length > 0)
    throw new AppError('Title is missing!', 400);

  const dataToUpdate = { title: req.body.title };
  response.status = 'Success';
  response.statusCode = 204;
  await axios.patch(
    `${process.env.BASE_API_URL}/${req.params.id}`,
    dataToUpdate
  );
  res.status(response.statusCode).send();
});

exports.removeMovie = catchErrorAsync(async (req, res) => {
  response.status = 'Success';
  response.statusCode = 204;
  await axios.delete(`${process.env.BASE_API_URL}/${req.params.id}`);
  res.status(response.statusCode).send();
});
