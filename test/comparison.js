/* eslint-disable no-self-compare, no-constant-binary-expression */
'use strict';

const assert = require('node:assert');
const test = require('node:test');

const { evaluate } = require('..');

test('Evaluate equality', () => {
  const program = '(= x y)';
  const context = { x: 1, y: 1 };
  const result = evaluate(program, context);
  const expected = 1 === 1;
  assert.strictEqual(result, expected, 'Equality operator failed');
});

test('Evaluate equality on more than two arguments', () => {
  const program = '(= x y z)';
  const context = { x: 1, y: 1, z: 1 };
  const result = evaluate(program, context);
  const expected = 1 === 1 && 1 === 1;
  assert.strictEqual(result, expected, 'Equality operator failed');
});

test('Evaluate equality with different values', () => {
  const program = '(= x y z)';
  const context = { x: 1, y: 2, z: 3 };
  const result = evaluate(program, context);
  const expected = 1 === 2 && 2 === 3;
  assert.strictEqual(result, expected, 'Equality operator failed');
});

test('Evaluate greater than', () => {
  const program = '(> x y)';
  const context = { x: 2, y: 1 };
  const result = evaluate(program, context);
  const expected = 2 > 1;
  assert.strictEqual(result, expected, 'Greater than operator failed');
});

test('Evaluate greater than on more than two arguments', () => {
  const program = '(> x y z)';
  const context = { x: 3, y: 2, z: 1 };
  const result = evaluate(program, context);
  const expected = 3 > 2 && 2 > 1;
  assert.strictEqual(result, expected, 'Greater than operator failed');
});

test('Evaluate greater than with different values', () => {
  const program = '(> x y z)';
  const context = { x: 1, y: 2, z: 3 };
  const result = evaluate(program, context);
  const expected = 1 > 2 && 2 > 3;
  assert.strictEqual(result, expected, 'Greater than operator failed');
});

test('Evaluate less than', () => {
  const program = '(< x y)';
  const context = { x: 1, y: 2 };
  const result = evaluate(program, context);
  const expected = 1 < 2;
  assert.strictEqual(result, expected, 'Less than operator failed');
});

test('Evaluate less than on more than two arguments', () => {
  const program = '(< x y z)';
  const context = { x: 1, y: 2, z: 3 };
  const result = evaluate(program, context);
  const expected = 1 < 2 && 2 < 3;
  assert.strictEqual(result, expected, 'Less than operator failed');
});

test('Evaluate less than with different values', () => {
  const program = '(< x y z)';
  const context = { x: 3, y: 2, z: 1 };
  const result = evaluate(program, context);
  const expected = 3 < 2 && 2 < 1;
  assert.strictEqual(result, expected, 'Less than operator failed');
});

test('Evaluate greater than or equal', () => {
  const program = '(>= x y)';
  const context = { x: 2, y: 1 };
  const result = evaluate(program, context);
  const expected = 2 >= 1;
  assert.strictEqual(result, expected, 'Greater than or equal operator failed');
});

test('Evaluate greater than or equal on more than two arguments', () => {
  const program = '(>= x y z)';
  const context = { x: 3, y: 2, z: 1 };
  const result = evaluate(program, context);
  const expected = 3 >= 2 && 2 >= 1;
  assert.strictEqual(result, expected, 'Greater than or equal operator failed');
});

test('Evaluate greater than or equal with different values', () => {
  const program = '(>= x y z)';
  const context = { x: 1, y: 2, z: 3 };
  const result = evaluate(program, context);
  const expected = 1 >= 2 && 2 >= 3;
  assert.strictEqual(result, expected, 'Greater than or equal operator failed');
});

test('Evaluate less than or equal', () => {
  const program = '(<= x y)';
  const context = { x: 1, y: 2 };
  const result = evaluate(program, context);
  const expected = 1 <= 2;
  assert.strictEqual(result, expected, 'Less than or equal operator failed');
});

test('Evaluate less than or equal on more than two arguments', () => {
  const program = '(<= x y z)';
  const context = { x: 1, y: 2, z: 3 };
  const result = evaluate(program, context);
  const expected = 1 <= 2 && 2 <= 3;
  assert.strictEqual(result, expected, 'Less than or equal operator failed');
});

test('Evaluate less than or equal with different values', () => {
  const program = '(<= x y z)';
  const context = { x: 3, y: 2, z: 1 };
  const result = evaluate(program, context);
  const expected = 3 <= 2 && 2 <= 1;
  assert.strictEqual(result, expected, 'Less than or equal operator failed');
});

test('Evaluate not equal', () => {
  const program = '(/= x y)';
  const context = { x: 1, y: 2 };
  const result = evaluate(program, context);
  const expected = 1 !== 2;
  assert.strictEqual(result, expected, 'Not equal operator failed');
});

test('Evaluate not equal on more than two arguments', () => {
  const program = '(/= x y z)';
  const context = { x: 3, y: 2, z: 3 };
  const result = evaluate(program, context);
  const expected = 3 !== 2 && 2 !== 3 && 3 !== 3;
  assert.strictEqual(result, expected, 'Not equal operator failed');
});

test('Evaluate not equal on more than two arguments with same values', () => {
  const program = '(/= x y z)';
  const context = { x: 1, y: 1, z: 1 };
  const result = evaluate(program, context);
  const expected = 1 !== 1 && 1 !== 1;
  assert.strictEqual(result, expected, 'Not equal operator failed');
});
