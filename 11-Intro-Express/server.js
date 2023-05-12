const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = express();

const PORT = process.env.PORT || 5010;

app.listen(
  PORT,
  console.log(
    `Server är igång på port: ${PORT} och kör i ${process.env.NODE_ENV} läge`
  )
);
