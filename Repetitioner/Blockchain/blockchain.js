const sha256 = require('sha256');

// Class...
// Constructor function...
function Blockchain() {
  this.chain = [];
  this.pendingList = [];

  // Skapa genesis blocket...
  this.createBlock(1, 'Genisis', 'Genisis');
}

// Skapa ett block
Blockchain.prototype.createBlock = function (nonce, previousHash, hash) {
  const block = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    data: this.pendingList,
    nonce: nonce,
    hash: hash,
    previousHash: previousHash,
  };

  this.pendingList = [];
  this.chain.push(block);

  return block;
};

// Hämta senaste blocket...
Blockchain.prototype.getLastBlock = function () {
  return this.chain.at(-1);
};

// Funktion för att lägga till data i pendingList...
Blockchain.prototype.addData = function (amount, sender, recipient) {
  const data = {
    amount,
    sender,
    recipient,
  };

  this.pendingList.push(data);

  return this.getLastBlock()['index'] + 1;
};

// Skapa ett hash värde...
Blockchain.prototype.createHash = function (prevHash, data, nonce) {
  const stringToHash = prevHash + JSON.stringify(data) + nonce.toString();
  const hash = sha256(stringToHash);
  return hash;
};

// Funktion som skyddar mot angrepp...
Blockchain.prototype.proofOfWork = function (prevHash, data) {
  /*
        Generera en ny hash till matchning uppnås => '0000AFD...'
        Använder aktuellt data för hash samt föregående hash
        Räknar upp nonce värdet tills korrekt hash är hittad
        Returnera nonce värdet när korrekt hash är funnen.
    */

  let nonce = 0;
  let hash = this.createHash(prevHash, data, nonce);

  while (hash.substring(0, 4) !== '0000') {
    nonce++;
    hash = this.createHash(prevHash, data, nonce);
    // console.log(hash);
  }

  return nonce;
};

module.exports = Blockchain;
