'use strict';

const assert = require('node:assert');
const test = require('node:test');
const metavm = require('metavm');
const { tokenize, parse } = require('..');

test('Translate LISP operation to JavaScript', () => {
  const program = '(+ 2 (* x 5) (- y 2))';
  const tokens = tokenize(program);
  const src = parse(tokens).toJavaScript();
  const ms = metavm.createScript('Function', src);
  const f = ms.exports;
  assert.strictEqual(f.toString(), '(x, y) => (2+(x*5)+(y-2))');
  const result = f(3, 7);
  const expected = 22;
  assert.strictEqual(result, expected);
});

test('Translate LISP condition to JavaScript', () => {
  // TODO: replace with comparison operators when they are implemented
  const program = '(cond ((+ x y)(+ 4 7)(+ 1 3)) ((- y x)(+ 5 2)))';
  const tokens = tokenize(program);
  const src = parse(tokens).toJavaScript();
  const ms = metavm.createScript('Function', src);
  const f = ms.exports;
  assert.strictEqual(
    f.toString(),
    '(x, y) => {if (x+y) {(4+7); return (1+3);} if (y-x) {return (5+2);}}',
  );
  const result = f(1, 2);
  const expected = 4;
  assert.strictEqual(result, expected);
});
