// Importera Node.js egna crypto bibliotek...
// const hexToBinary = require('hex-to-binary');
const crypto = require('crypto');

const createHash = (...args) => {
  // Skapa ett objekt ifrån nodes crypto bibliotek...
  // Ange algoritm(sha256)
  const hash = crypto.createHash('sha256');
  // Skapa en hash av våra inskickade argument...
  // Den gamla hash uppdateringen...
  // hash.update(args.sort().join(' '));

  hash.update(
    args
      .map((input) => JSON.stringify(input))
      .sort()
      .join(' ')
  );

  // Beräkna värdet baserat på algoritm, inskickade argument och
  // skapa en output i hex format...
  // return hexToBinary(hash.digest('hex'));
  return hash.digest('hex');
};

module.exports = createHash;
