const Wallet = require('./Wallet');
const { verifySignature } = require('../utilities');

describe('Wallet', () => {
  let wallet;

  beforeEach(() => {
    wallet = new Wallet();
  });

  it('should have a balance', () => {
    expect(wallet).toHaveProperty('balance');
  });

  it('should have a public key (publicKey)', () => {
    // console.log(wallet.publicKey);
    expect(wallet).toHaveProperty('publicKey');
  });

  describe('signing data', () => {
    const data = 'Avatar';

    it('should verify a valid signature', () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          signature: wallet.sign(data),
        })
      ).toBe(true);
    });

    it('should not verify an invalid signature', () => {});
  });
});
