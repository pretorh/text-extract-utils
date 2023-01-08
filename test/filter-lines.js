import { describe, it } from 'mocha';
import { expect } from 'chai';
import { filterLines } from '../dist/index.js';

describe('text filtering', () => {
  describe('filterLines', () => {
    const lines = [
      'a',
      'beginning line',
      'c',
      'd',
      'block ends',
      'f',
    ];

    it('returns the lines between the `before` and `after` items', () => {
      const filtered = filterLines(lines, 'beginning line', 'block ends');
      expect(filtered).to.have.same.members(['c', 'd']);
    });

    it('returns the lines between the `before` and `after` RegExp', () => {
      const filtered = filterLines(lines, /^begin/, /ends$/);
      expect(filtered).to.have.same.members(['c', 'd']);
    });
  });
});
