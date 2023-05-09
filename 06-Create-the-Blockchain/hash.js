// Importera Node.js egna crypto bibliotek...

const crypto = require('crypto');

const createHash = (...args) => {
  // Skapa ett objekt ifrån nodes crypto bibliotek...
  // Ange algoritm(sha256)
  const hash = crypto.createHash('sha256');
  // Skapa en hash av våra inskickade argument...
  hash.update(args.sort().join(' '));
  // Beräkna värdet baserat på algoritm, inskickade argument och
  // skapa en output i hex format...
  return hash.digest('hex');
};

module.exports = createHash;
