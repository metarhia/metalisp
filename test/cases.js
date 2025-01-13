'use strict';

const assert = require('node:assert');
const test = require('node:test');
const { evaluate } = require('..');

test('Evaluate arithmetic expressions', () => {
  const program = '(+ 2 (* x 5) (- y 2))';
  const context = { x: 3, y: 7 };
  const result = evaluate(program, context);
  const expected = 2 + 3 * 5 + (7 - 2);
  assert.strictEqual(result, expected, 'Arithmetic evaluation failed');
});

test('Evaluate equality (true)', () => {
  const program = '(eq 3 3)';
  const result = evaluate(program, {});
  const expected = true;
  assert.strictEqual(result, expected, 'Equality (true) evaluation failed');
});

test('Evaluate equality (false)', () => {
  const program = '(eq 3 4)';
  const result = evaluate(program, {});
  const expected = false;
  assert.strictEqual(result, expected, 'Equality (false) evaluation failed');
});

test('Evaluate list creation', () => {
  const program = '(list 7 3 1)';
  const result = evaluate(program, {});
  const expected = [7, 3, 1];
  assert.deepStrictEqual(result, expected, 'List creation failed');
});

test('Evaluate car (head of list)', () => {
  const program = '(car (list 7 3 1))';
  const result = evaluate(program, {});
  const expected = 7;
  assert.strictEqual(result, expected, 'car (head of list) failed');
});

test('Evaluate cdr (tail of list)', () => {
  const program = '(cdr (list 7 3 1))';
  const result = evaluate(program, {});
  const expected = [3, 1];
  assert.deepStrictEqual(result, expected, 'cdr (tail of list) failed');
});

test('Evaluate equality with t', () => {
  const program = '(eq (eq 3 3) t)';
  const result = evaluate(program, {});
  const expected = true;
  assert.strictEqual(result, expected, 'Equality with t failed');
});

test('Evaluate equality with nil', () => {
  const program = '(eq (eq 3 4) nil)';
  const result = evaluate(program, {});
  const expected = true;
  assert.strictEqual(result, expected, 'Equality with nil failed');
});
