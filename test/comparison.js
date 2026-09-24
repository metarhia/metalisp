/* eslint-disable no-self-compare, no-constant-binary-expression */
'use strict';

const assert = require('node:assert');
const { describe, it } = require('node:test');
const { evaluate } = require('..');

describe('Comparison on number operators', () => {
  describe('=', () => {
    it('Evaluate equality', () => {
      const program = '(= x y)';
      const context = { x: 1, y: 1 };
      const result = evaluate(program, context);
      const expected = 1 === 1;
      assert.strictEqual(result, expected, 'Equality operator failed');
    });

    it('Evaluate equality on more than two arguments', () => {
      const program = '(= x y z)';
      const context = { x: 1, y: 1, z: 1 };
      const result = evaluate(program, context);
      const expected = 1 === 1 && 1 === 1;
      assert.strictEqual(result, expected, 'Equality operator failed');
    });

    it(`Evaluate equality on more than
      two arguments with different values`, () => {
      const program = '(= x y z)';
      const context = { x: 1, y: 2, z: 3 };
      const result = evaluate(program, context);
      const expected = 1 === 2 && 2 === 3;
      assert.strictEqual(result, expected, 'Equality operator failed');
    });
  });

  describe('>', () => {
    it('Evaluate greater than', () => {
      const program = '(> x y)';
      const context = { x: 2, y: 1 };
      const result = evaluate(program, context);
      const expected = 2 > 1;
      assert.strictEqual(result, expected, 'Greater than operator failed');
    });

    it('Evaluate greater than on more than two arguments', () => {
      const program = '(> x y z)';
      const context = { x: 3, y: 2, z: 1 };
      const result = evaluate(program, context);
      const expected = 3 > 2 && 2 > 1;
      assert.strictEqual(result, expected, 'Greater than operator failed');
    });

    it(`Evaluate greater than on more than
      two arguments with different values`, () => {
      const program = '(> x y z)';
      const context = { x: 1, y: 2, z: 3 };
      const result = evaluate(program, context);
      const expected = 1 > 2 && 2 > 3;
      assert.strictEqual(result, expected, 'Greater than operator failed');
    });
  });

  describe('<', () => {
    it('Evaluate less than', () => {
      const program = '(< x y)';
      const context = { x: 1, y: 2 };
      const result = evaluate(program, context);
      const expected = 1 < 2;
      assert.strictEqual(result, expected, 'Less than operator failed');
    });

    it('Evaluate less than on more than two arguments', () => {
      const program = '(< x y z)';
      const context = { x: 1, y: 2, z: 3 };
      const result = evaluate(program, context);
      const expected = 1 < 2 && 2 < 3;
      assert.strictEqual(result, expected, 'Less than operator failed');
    });

    it(`Evaluate less than on more than
      two arguments with different values`, () => {
      const program = '(< x y z)';
      const context = { x: 3, y: 2, z: 1 };
      const result = evaluate(program, context);
      const expected = 3 < 2 && 2 < 1;
      assert.strictEqual(result, expected, 'Less than operator failed');
    });
  });

  describe('>=', () => {
    it('Evaluate greater than or equal', () => {
      const program = '(>= x y)';
      const context = { x: 2, y: 1 };
      const result = evaluate(program, context);
      const expected = 2 >= 1;
      assert.strictEqual(
        result,
        expected,
        'Greater than or equal operator failed',
      );
    });

    it('Evaluate greater than or equal on more than two arguments', () => {
      const program = '(>= x y z)';
      const context = { x: 3, y: 2, z: 1 };
      const result = evaluate(program, context);
      const expected = 3 >= 2 && 2 >= 1;
      assert.strictEqual(
        result,
        expected,
        'Greater than or equal operator failed',
      );
    });

    it(`Evaluate greater than or equal on more than
      two arguments with different values`, () => {
      const program = '(>= x y z)';
      const context = { x: 1, y: 2, z: 3 };
      const result = evaluate(program, context);
      const expected = 1 >= 2 && 2 >= 3;
      assert.strictEqual(
        result,
        expected,
        'Greater than or equal operator failed',
      );
    });
  });

  describe('<=', () => {
    it('Evaluate less than or equal', () => {
      const program = '(<= x y)';
      const context = { x: 1, y: 2 };
      const result = evaluate(program, context);
      const expected = 1 <= 2;
      assert.strictEqual(
        result,
        expected,
        'Less than or equal operator failed',
      );
    });

    it('Evaluate less than or equal on more than two arguments', () => {
      const program = '(<= x y z)';
      const context = { x: 1, y: 2, z: 3 };
      const result = evaluate(program, context);
      const expected = 1 <= 2 && 2 <= 3;
      assert.strictEqual(
        result,
        expected,
        'Less than or equal operator failed',
      );
    });

    it(`Evaluate less than or equal on more than
      two arguments with different values`, () => {
      const program = '(<= x y z)';
      const context = { x: 3, y: 2, z: 1 };
      const result = evaluate(program, context);
      const expected = 3 <= 2 && 2 <= 1;
      assert.strictEqual(
        result,
        expected,
        'Less than or equal operator failed',
      );
    });
  });

  describe('/=', () => {
    it('Evaluate not equal', () => {
      const program = '(/= x y)';
      const context = { x: 1, y: 2 };
      const result = evaluate(program, context);
      const expected = 1 !== 2;
      assert.strictEqual(result, expected, 'Not equal operator failed');
    });

    it('Evaluate not equal on more than two arguments', () => {
      const program = '(/= x y z)';
      const context = { x: 3, y: 2, z: 3 };
      const result = evaluate(program, context);
      const expected = 3 !== 2 && 2 !== 3 && 3 !== 3;
      assert.strictEqual(result, expected, 'Not equal operator failed');
    });

    it(`Evaluate not equal on more than
      two arguments with same values`, () => {
      const program = '(/= x y z)';
      const context = { x: 1, y: 1, z: 1 };
      const result = evaluate(program, context);
      const expected = 1 !== 1 && 1 !== 1;
      assert.strictEqual(result, expected, 'Not equal operator failed');
    });
  });
});
