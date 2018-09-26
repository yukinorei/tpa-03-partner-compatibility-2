const { calculateBestMatch, calculateScore } = require('./compatibility-calculator');
const { candidates } = require('./data/candidates-data.js');

describe('calculateScore', () => {
  test('should return 2 if equal', () => {
    expect(calculateScore(1, 1)).toBe(2);
  });

  test('should return 1 if 1 point difference', () => {
    expect(calculateScore(2, 1)).toBe(1);
    expect(calculateScore(1, 2)).toBe(1);
  });

  test('should return 0 if 2 or more different', () => {
    expect(calculateScore(1, 3)).toBe(0);
    expect(calculateScore(3, 1)).toBe(0);
    expect(calculateScore(1, 4)).toBe(0);
  });
});

describe('compatibility-caculator', () => {
  test('check that 1 is one', () => {
    expect(calculateBestMatch(candidates[0])).toEqual(candidates[0]);
  });
});
