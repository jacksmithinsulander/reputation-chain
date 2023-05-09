const Blockchain = require('./Blockchain');
const Block = require('./Block');

describe('Blockchain', () => {
  const blockchain = new Blockchain();

  // Test 1. kontrollerar att chain är av typen Array
  // chain är en egenskap som kommer att finnas i blockchain klassen
  it('should contain an Array of blocks', () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  // Test 2. listan(array) ska alltid börja med ett genesis block...
  it('should start with the genesis block', () => {
    // expect(blockchain.chain[0]).toEqual(Block.genesis());
    expect(blockchain.chain.at(0)).toEqual(Block.genesis());
  });

  // Test 3. Det ska gå att lägga till ett nytt block i listan...
  // metoden kommer heta addBlock...
  // Kontrollen går ut på att titta på sista elementet i listan
  // och jämföra det med det vi adderar...
  it('should add a new block to the chain', () => {
    const data = 'Aquaman';
    blockchain.addBlock({ data });
    // expect(blockchain.chain[blockchain.chain.length -1]).toEqual(data)
    expect(blockchain.chain.at(-1).data).toEqual(data);
  });
});
