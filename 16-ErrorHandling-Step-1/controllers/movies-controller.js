const axios = require('axios');

const response = {
  status: 'Not found',
  statusCode: 404,
  data: null,
  error: null,
};

const catchErrorAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};

exports.listMovies = async (req, res) => {
  try {
    const { data } = await axios.get(process.env.BASE_API_URL);
    response.status = 'Success';
    response.statusCode = 200;
    response.data = data;
    res.status(response.statusCode).json(response);
  } catch (error) {
    response.status = 'Internal Server Error';
    response.statusCode = 500;
    response.data = null;
    res.status(500).json(response);
  }
};

exports.findMovie = async (req, res) => {
  try {
    const url = `${process.env.BASE_API_URL}/${req.params.id}`;
    const { data } = await axios.get(url);
    response.status = 'Success';
    response.statusCode = 200;
    response.data = data;
    res.status(response.statusCode).json(response);
  } catch (error) {
    response.status = 'Not found';
    response.statusCode = 404;
    response.data = null;
    res.status(response.statusCode).json(response);
  }
};

exports.addMovie = catchErrorAsync(async (req, res) => {
  if (!req.body.length) throw Error('No data received');
  // if (!req.body.title.length > 0) {
  //   throw Error('Title is missing');
  // }
  response.status = 'Success';
  response.statusCode = 201;
  response.data = null;
  const { data } = await axios.post(process.env.BASE_API_URL, req.body);
  response.data = data;
  res.status(response.statusCode).json(response);
});

exports.updateMovie = async (req, res) => {
  try {
    response.status = 'Success';
    response.statusCode = 204;

    await axios.put(`${process.env.BASE_API_URL}/${req.params.id}`, req.body);
    res.status(response.statusCode).send();
  } catch (error) {
    response.status = 'Bad request';
    response.statusCode = 400;
    response.data = null;
    response.error = error.message;
    res.status(response.statusCode).json(response);
  }
};

exports.changeMovieTitle = async (req, res) => {
  try {
    const dataToUpdate = { title: req.body.title };
    response.status = 'Success';
    response.statusCode = 204;
    await axios.patch(
      `${process.env.BASE_API_URL}/${req.params.id}`,
      dataToUpdate
    );
    res.status(response.statusCode).send();
  } catch (error) {
    response.status = 'Bad request';
    response.statusCode = 400;
    response.data = null;
    response.error = error.message;
    res.status(response.statusCode).json(response);
  }
};

exports.removeMovie = catchErrorAsync(async (req, res) => {
  response.status = 'Success';
  response.statusCode = 204;
  await axios.delete(`${process.env.BASE_API_URL}/${req.params.id}`);
  res.status(response.statusCode).send();
});
