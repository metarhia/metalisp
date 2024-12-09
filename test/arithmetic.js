'use strict';
const assert = require('node:assert');
const { describe, it } = require('node:test');
const { evaluate } = require('..');

describe('Arithmetic operators', () => {
  describe('Addition', () => {
    it('Evaluate addition', () => {
      const program = '(+ x y)';
      const context = { x: 1, y: 2 };
      const result = evaluate(program, context);
      const expected = 1 + 2;
      assert.strictEqual(result, expected, 'Addition operator failed');
    });

    it('Evaluate addition on more than two arguments', () => {
      const program = '(+ x y z)';
      const context = { x: 1, y: 2, z: 3 };
      const result = evaluate(program, context);
      const expected = 1 + 2 + 3;
      assert.strictEqual(result, expected, 'Addition operator failed');
    });
  });

  describe('Subtraction', () => {
    it('Evaluate subtraction', () => {
      const program = '(- x y)';
      const context = { x: 1, y: 2 };
      const result = evaluate(program, context);
      const expected = 1 - 2;
      assert.strictEqual(result, expected, 'Subtraction operator failed');
    });

    it('Evaluate subtraction on more than two arguments', () => {
      const program = '(- x y z)';
      const context = { x: 1, y: 2, z: 3 };
      const result = evaluate(program, context);
      const expected = 1 - 2 - 3;
      assert.strictEqual(result, expected, 'Subtraction operator failed');
    });
  });

  describe('Multiplication', () => {
    it('Evaluate multiplication', () => {
      const program = '(* x y)';
      const context = { x: 1, y: 2 };
      const result = evaluate(program, context);
      const expected = 1 * 2;
      assert.strictEqual(result, expected, 'Multiplication operator failed');
    });

    it('Evaluate multiplication with no arguments', () => {
      const program = '(* )';
      const result = evaluate(program);
      const expected = 1;
      assert.strictEqual(result, expected, 'Multiplication operator failed');
    });

    it('Evaluate multiplication on more than two arguments', () => {
      const program = '(* x y z)';
      const context = { x: 1, y: 2, z: 3 };
      const result = evaluate(program, context);
      const expected = 1 * 2 * 3;
      assert.strictEqual(result, expected, 'Multiplication operator failed');
    });
  });

  describe('Division', () => {
    it('Evaluate division', () => {
      const program = '(/ x y)';
      const context = { x: 1, y: 2 };
      const result = evaluate(program, context);
      const expected = 1 / 2;
      assert.strictEqual(result, expected, 'Division operator failed');
    });

    it('Evaluate division on more than two arguments', () => {
      const program = '(/ x y z)';
      const context = { x: 3, y: 4, z: 5 };
      const result = evaluate(program, context);
      const expected = 3 / (4 * 5);
      assert.strictEqual(result, expected, 'Division operator failed');
    });
  });

  it('Evaluate modulus', () => {
    const program = '(mod x y)';
    const context = { x: 20, y: 10 };
    const result = evaluate(program, context);
    const expected = 20 % 10;
    assert.strictEqual(result, expected, 'Modulus operator failed');
  });

  it('Evaluate modulus with negative numbers', () => {
    const program = '(mod x y)';
    const context = { x: -1, y: 5 };
    const result = evaluate(program, context);
    const expected = ((-1 % 5) + 5) % 5;
    assert.strictEqual(
      result,
      expected,
      'Modulus operator with negative numbers failed',
    );
  });

  it('Evaluate remainder', () => {
    const program = '(rem x y)';
    const context = { x: -1, y: 5 };
    const result = evaluate(program, context);
    const expected = -1 % 5;
    assert.strictEqual(result, expected, 'Reminder operator failed');
  });

  it('Evaluate increment', () => {
    const program = '(incf x)';
    const context = { x: 1 };
    const result = evaluate(program, context);
    const expected = 1 + 1;
    assert.strictEqual(result, expected, 'Increment operator failed');
  });

  it('Evaluate increment with second argument', () => {
    const program = '(incf x y)';
    const context = { x: 1, y: 2 };
    const result = evaluate(program, context);
    const expected = 1 + 2;
    assert.strictEqual(
      result,
      expected,
      'Increment operator with second argument failed',
    );
  });

  it('Evaluate decrement', () => {
    const program = '(decf x)';
    const context = { x: 1 };
    const result = evaluate(program, context);
    const expected = 1 - 1;
    assert.strictEqual(result, expected, 'Decrement operator failed');
  });

  it('Evaluate decrement with second argument', () => {
    const program = '(decf x y)';
    const context = { x: 1, y: 2 };
    const result = evaluate(program, context);
    const expected = 1 - 2;
    assert.strictEqual(
      result,
      expected,
      'Decrement operator with second argument failed',
    );
  });

  it('Evaluate increment shortcut', () => {
    const program = '(1+ x)';
    const context = { x: 1 };
    const result = evaluate(program, context);
    const expected = 1 + 1;
    assert.strictEqual(result, expected, 'Increment shortcut operator fail');
  });

  it('Evaluate decrement shortcut', () => {
    const program = '(1- x)';
    const context = { x: 1 };
    const result = evaluate(program, context);
    const expected = 1 - 1;
    assert.strictEqual(result, expected, 'Decrement shortcut operator fail');
  });

  it('Evaluate complex arithmetic expression', () => {
    const program = '(+ (mod x y) (incf y))';
    const context = { x: -1, y: 5 };
    const result = evaluate(program, context);
    const expected = (((-1 % 5) + 5) % 5) + 6;
    assert.strictEqual(
      result,
      expected,
      'Complex arithmetic expression failed',
    );
  });

  describe('Greatest common divisor', () => {
    it('Evaluate gcd on two arguments', () => {
      const program = '(gcd x y)';
      const context = { x: 20, y: 10 };
      const result = evaluate(program, context);
      const expected = 10;
      assert.strictEqual(result, expected, 'GCD operator failed');
    });

    it('Evaluate gcd on multiple arguments', () => {
      const program = '(gcd x y z)';
      const context = { x: 20, y: 10, z: 5 };
      const result = evaluate(program, context);
      const expected = 5;
      assert.strictEqual(result, expected, 'GCD operator failed');
    });

    it('Evaluate gcd on some negative arguments', () => {
      const program = '(gcd x y)';
      const context = { x: -20, y: 10 };
      const result = evaluate(program, context);
      const expected = 10;
      assert.strictEqual(result, expected, 'GCD operator failed');
    });

    it('Evaluate gcd on single negative argument', () => {
      const program = '(gcd x)';
      const context = { x: -20 };
      const result = evaluate(program, context);
      const expected = 20;
      assert.strictEqual(result, expected, 'GCD operator failed');
    });

    it('Evaluate gcd on no arguments', () => {
      const program = '(gcd)';
      const result = evaluate(program);
      const expected = 0;
      assert.strictEqual(result, expected, 'GCD operator failed');
    });

    it('Evaluate gcd on single argument', () => {
      const program = '(gcd x)';
      const context = { x: 20 };
      const result = evaluate(program, context);
      const expected = 20;
      assert.strictEqual(result, expected, 'GCD operator failed');
    });
  });

  describe('Least common multiple', () => {
    it('Evaluate lcm on two arguments', () => {
      const program = '(lcm x y)';
      const context = { x: 20, y: 10 };
      const result = evaluate(program, context);
      const expected = 20;
      assert.strictEqual(result, expected, 'LCM operator failed');
    });

    it('Evaluate lcm on multiple arguments', () => {
      const program = '(lcm x y z)';
      const context = { x: 1, y: 2, z: 3 };
      const result = evaluate(program, context);
      const expected = 6;
      assert.strictEqual(result, expected, 'LCM operator failed');
    });

    it('Evaluate lcm on some negative arguments', () => {
      const program = '(lcm x y)';
      const context = { x: -20, y: 10 };
      const result = evaluate(program, context);
      const expected = 20;
      assert.strictEqual(result, expected, 'LCM operator failed');
    });

    it('Evaluate lcm on single negative argument', () => {
      const program = '(lcm x)';
      const context = { x: -20 };
      const result = evaluate(program, context);
      const expected = 20;
      assert.strictEqual(result, expected, 'LCM operator failed');
    });

    it('Evaluate lcm on no arguments', () => {
      const program = '(lcm)';
      const result = evaluate(program);
      const expected = 1;
      assert.strictEqual(result, expected, 'LCM operator failed');
    });
  });
});
