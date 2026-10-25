'use strict';

const assert = require('node:assert');
const test = require('node:test');

const { evaluate } = require('..');

test('Evaluate addition', () => {
  const program = '(+ x y)';
  const context = { x: 1, y: 2 };
  const result = evaluate(program, context);
  const expected = 1 + 2;
  assert.strictEqual(result, expected, 'Addition operator failed');
});

test('Evaluate addition on more than two arguments', () => {
  const program = '(+ x y z)';
  const context = { x: 1, y: 2, z: 3 };
  const result = evaluate(program, context);
  const expected = 1 + 2 + 3;
  assert.strictEqual(result, expected, 'Addition operator failed');
});

test('Evaluate subtraction', () => {
  const program = '(- x y)';
  const context = { x: 1, y: 2 };
  const result = evaluate(program, context);
  const expected = 1 - 2;
  assert.strictEqual(result, expected, 'Subtraction operator failed');
});

test('Evaluate subtraction on more than two arguments', () => {
  const program = '(- x y z)';
  const context = { x: 1, y: 2, z: 3 };
  const result = evaluate(program, context);
  const expected = 1 - 2 - 3;
  assert.strictEqual(result, expected, 'Subtraction operator failed');
});

test('Evaluate multiplication', () => {
  const program = '(* x y)';
  const context = { x: 1, y: 2 };
  const result = evaluate(program, context);
  const expected = 1 * 2;
  assert.strictEqual(result, expected, 'Multiplication operator failed');
});

test('Evaluate multiplication with no arguments', () => {
  const program = '(* )';
  const result = evaluate(program);
  const expected = 1;
  assert.strictEqual(result, expected, 'Multiplication operator failed');
});

test('Evaluate multiplication on more than two arguments', () => {
  const program = '(* x y z)';
  const context = { x: 1, y: 2, z: 3 };
  const result = evaluate(program, context);
  const expected = 1 * 2 * 3;
  assert.strictEqual(result, expected, 'Multiplication operator failed');
});

test('Evaluate division', () => {
  const program = '(/ x y)';
  const context = { x: 1, y: 2 };
  const result = evaluate(program, context);
  const expected = 1 / 2;
  assert.strictEqual(result, expected, 'Division operator failed');
});

test('Evaluate division on more than two arguments', () => {
  const program = '(/ x y z)';
  const context = { x: 3, y: 4, z: 5 };
  const result = evaluate(program, context);
  const expected = 3 / (4 * 5);
  assert.strictEqual(result, expected, 'Division operator failed');
});

test('Evaluate division with zero dividend', () => {
  const program = '(/ x y)';
  const context = { x: 0, y: 5 };
  const result = evaluate(program, context);
  const expected = 0;
  assert.strictEqual(result, expected, 'Division operator failed');
});

test('Evaluate division by zero', () => {
  const program = '(/ x y)';
  const context = { x: 5, y: 0 };
  const expected = { name: 'Error', message: 'Division by zero' };
  assert.throws(() => evaluate(program, context), expected);
});

test('Evaluate division from left to right', () => {
  const program = '(/ x y z)';
  const context = { x: 1e300, y: 1e200, z: 1e200 };
  const result = evaluate(program, context);
  const expected = 1e300 / 1e200 / 1e200;
  assert.strictEqual(result, expected, 'Division operator failed');
});

test('Evaluate multiplication and division on bigint', () => {
  const context = { x: 6n, y: 3n };
  assert.strictEqual(evaluate('(* x y)', context), 18n);
  assert.strictEqual(evaluate('(/ x y)', context), 2n);
  assert.strictEqual(evaluate('(/ x)', context), 6n);
});

test('Evaluate modulus', () => {
  const program = '(mod x y)';
  const context = { x: 20, y: 10 };
  const result = evaluate(program, context);
  const expected = 20 % 10;
  assert.strictEqual(result, expected, 'Modulus operator failed');
});

test('Evaluate modulus with negative numbers', () => {
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

test('Evaluate remainder', () => {
  const program = '(rem x y)';
  const context = { x: -1, y: 5 };
  const result = evaluate(program, context);
  const expected = -1 % 5;
  assert.strictEqual(result, expected, 'Remainder operator failed');
});

test('Evaluate increment', () => {
  const program = '(incf x)';
  const context = { x: 1 };
  const result = evaluate(program, context);
  const expected = 1 + 1;
  assert.strictEqual(result, expected, 'Increment operator failed');
});

test('Evaluate increment with second argument', () => {
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

test('Evaluate decrement', () => {
  const program = '(decf x)';
  const context = { x: 1 };
  const result = evaluate(program, context);
  const expected = 1 - 1;
  assert.strictEqual(result, expected, 'Decrement operator failed');
});

test('Evaluate decrement with second argument', () => {
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

test('Evaluate increment shortcut', () => {
  const program = '(1+ x)';
  const context = { x: 1 };
  const result = evaluate(program, context);
  const expected = 1 + 1;
  assert.strictEqual(result, expected, 'Increment shortcut operator failed');
});

test('Evaluate decrement shortcut', () => {
  const program = '(1- x)';
  const context = { x: 1 };
  const result = evaluate(program, context);
  const expected = 1 - 1;
  assert.strictEqual(result, expected, 'Decrement shortcut operator failed');
});

test('Evaluate complex arithmetic expression', () => {
  const program = '(+ (mod x y) (incf y))';
  const context = { x: -1, y: 5 };
  const result = evaluate(program, context);
  const expected = (((-1 % 5) + 5) % 5) + 6;
  assert.strictEqual(result, expected, 'Complex arithmetic expression failed');
});

test('Evaluate gcd on two arguments', () => {
  const program = '(gcd x y)';
  const context = { x: 20, y: 10 };
  const result = evaluate(program, context);
  const expected = 10;
  assert.strictEqual(result, expected, 'GCD operator failed');
});

test('Evaluate gcd on multiple arguments', () => {
  const program = '(gcd x y z)';
  const context = { x: 20, y: 10, z: 5 };
  const result = evaluate(program, context);
  const expected = 5;
  assert.strictEqual(result, expected, 'GCD operator failed');
});

test('Evaluate gcd on some negative arguments', () => {
  const program = '(gcd x y)';
  const context = { x: -20, y: 10 };
  const result = evaluate(program, context);
  const expected = 10;
  assert.strictEqual(result, expected, 'GCD operator failed');
});

test('Evaluate gcd on single negative argument', () => {
  const program = '(gcd x)';
  const context = { x: -20 };
  const result = evaluate(program, context);
  const expected = 20;
  assert.strictEqual(result, expected, 'GCD operator failed');
});

test('Evaluate gcd on no arguments', () => {
  const program = '(gcd)';
  const result = evaluate(program);
  const expected = 0;
  assert.strictEqual(result, expected, 'GCD operator failed');
});

test('Evaluate gcd on single argument', () => {
  const program = '(gcd x)';
  const context = { x: 20 };
  const result = evaluate(program, context);
  const expected = 20;
  assert.strictEqual(result, expected, 'GCD operator failed');
});

test('Evaluate lcm on two arguments', () => {
  const program = '(lcm x y)';
  const context = { x: 20, y: 10 };
  const result = evaluate(program, context);
  const expected = 20;
  assert.strictEqual(result, expected, 'LCM operator failed');
});

test('Evaluate lcm on multiple arguments', () => {
  const program = '(lcm x y z)';
  const context = { x: 1, y: 2, z: 3 };
  const result = evaluate(program, context);
  const expected = 6;
  assert.strictEqual(result, expected, 'LCM operator failed');
});

test('Evaluate lcm on some negative arguments', () => {
  const program = '(lcm x y)';
  const context = { x: -20, y: 10 };
  const result = evaluate(program, context);
  const expected = 20;
  assert.strictEqual(result, expected, 'LCM operator failed');
});

test('Evaluate lcm on single negative argument', () => {
  const program = '(lcm x)';
  const context = { x: -20 };
  const result = evaluate(program, context);
  const expected = 20;
  assert.strictEqual(result, expected, 'LCM operator failed');
});

test('Evaluate lcm on no arguments', () => {
  const program = '(lcm)';
  const result = evaluate(program);
  const expected = 1;
  assert.strictEqual(result, expected, 'LCM operator failed');
});

test('Evaluate gcd and lcm with zero argument', () => {
  const context = { x: 5, y: 0 };
  assert.strictEqual(evaluate('(gcd x y)', context), 5);
  assert.strictEqual(evaluate('(gcd y y)', context), 0);
  assert.strictEqual(evaluate('(lcm x y)', context), 0);
  assert.strictEqual(evaluate('(lcm y y)', context), 0);
});

test('Evaluate gcd and lcm on negative arguments', () => {
  const context = { x: 20, y: -10 };
  assert.strictEqual(evaluate('(gcd x y)', context), 10);
  assert.strictEqual(evaluate('(lcm x y)', context), 20);
});

test('Evaluate lcm on large arguments', () => {
  const program = '(lcm x y)';
  const context = { x: 94906267, y: 94906267 };
  const result = evaluate(program, context);
  const expected = 94906267;
  assert.strictEqual(result, expected, 'LCM operator failed');
});

test('Evaluate gcd and lcm on non-integer arguments', () => {
  const context = { x: 0.5, y: NaN };
  const expected = { name: 'TypeError', message: 'Expected integer operands' };
  assert.throws(() => evaluate('(gcd x 2)', context), expected);
  assert.throws(() => evaluate('(lcm y 2)', context), expected);
});
