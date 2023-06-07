const crypto = require('./hash');

describe('crypto()', () => {
  it('should generate a SHA-256 hash as output', () => {
    expect(crypto('kalle')).toEqual(
      '060d3af30443cfcb974ec3fb4a582e9a992fb6dda709c0e2f85e79b7ccb46e8a'
    );
  });
});

it('should produce the same hash with same input regardless of order', () => {
  expect(crypto('kalle', 'batman', 'Aquaman')).toEqual(
    crypto('batman', 'kalle', 'Aquaman')
  );
});

it('should regenerate the hash when the properties have changed', () => {
  const obj = {};
  const originalHash = crypto(obj);
  obj['id'] = 10;

  expect(crypto(obj)).not.toEqual(originalHash);
});
