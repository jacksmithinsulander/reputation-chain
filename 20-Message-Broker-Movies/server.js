const express = require('express');
const Broker = require('./redis/broker');
const { default: axios } = require('axios');

const app = express();

let movies = [];

const DEFAULT_PORT = 3000;
const ROOT_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

// Synkronisera datat vid uppstart...
const syncData = async () => {
  try {
    const url = `${ROOT_ADDRESS}/api/1/movies`;
    const { data } = await axios.get(url);
    movies = data;
    console.log('Synchronizing at startup', movies);
  } catch (err) {
    console.log('Error', err);
  }
};
// const movie = {
//   title: 'Avengers End Game',
//   length: '3tim 5min',
//   releaseYear: 2019,
// };

// Skapa en instans av klassen Broker...
const messageBroker = new Broker(movies);

// Denna timeout är tillfällig...
// setTimeout(() => {
//   messageBroker.broadcast();
// }, 1000);

// Lägg till Middleware...
app.use(express.json());

app.get('/api/1/movies', (req, res) => {
  res.status(200).json(movies);
});

app.post('/api/1/movies', (req, res) => {
  const body = req.body;
  movies.push(body);
  messageBroker.broadcast();
  res.status(201).json(body);
});

let NODE_PORT;

if (process.env.GENERATE_PEER_PORT === 'true') {
  NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 100);
}

const PORT = NODE_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);

  if (PORT !== DEFAULT_PORT) {
    syncData();
  }
});
