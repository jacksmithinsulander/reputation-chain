const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = express();

// Skapar endpoints(resurser)
app.get('/api/1/movies', (req, res) => {
  res.status(200).json({
    success: true,
    error: null,
    data: 'Här kommer filmerna att levereras',
  });
});

app.get('/api/1/movies/:id', (req, res) => {
  res.status(200).json({
    success: true,
    error: null,
    data: `Här kommer filmen med id ${req.params.id}`,
  });
});

app.post('/api/1/movies', (req, res) => {
  res.status(201).json({
    success: true,
    error: null,
    data: `Här kommer filmen som du sparade`,
  });
});

app.delete('/api/1/movies/:id', (req, res) => {
  res.status(204).send();
});

app.put('/api/1/movies/:id', (req, res) => {
  res.status(204).send();
});

const PORT = process.env.PORT || 5010;

app.listen(
  PORT,
  console.log(
    `Server är igång på port: ${PORT} och kör i ${process.env.NODE_ENV} läge`
  )
);
