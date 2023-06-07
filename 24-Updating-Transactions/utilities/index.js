const EC = require('elliptic').ec;
const crypto = require('../utilities/hash');

const ec = new EC('secp256k1');

const verifySignature = ({ publicKey, data, signature }) => {
  const key = ec.keyFromPublic(publicKey, 'hex');
  return key.verify(crypto(data), signature);
};

module.exports = { ec, verifySignature };
