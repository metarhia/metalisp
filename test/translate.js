'use strict';

const assert = require('node:assert');
const test = require('node:test');
const metavm = require('metavm');
const { tokenize, parse } = require('..');

test('Translate LISP to JavaScript', () => {
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
