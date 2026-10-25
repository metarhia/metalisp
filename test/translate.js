'use strict';

const assert = require('node:assert');
const test = require('node:test');

const metavm = require('metavm');
const { tokenize, parse } = require('..');

test('Translate LISP to JavaScript', () => {
  const program = '(+ 2 (* x 5) (- y 2))';
  const [tokens] = tokenize(program);
  const src = parse(tokens).toJavaScript();
  const ms = metavm.createScript('Function', src);
  const f = ms.exports;
  assert.strictEqual(
    f.toString(),
    '(x, y) => (2+(x*5)+(y-2))',
    'Translation to JavaScript failed',
  );
  const result = f(3, 7);
  const expected = 22;
  assert.strictEqual(result, expected, 'Translated function failed');
});

test('Translate LISP operators with Common Lisp semantics', () => {
  const translate = (program) => parse(tokenize(program)[0]).toJavaScript();
  assert.strictEqual(translate('(- x)'), '(x) => (-x)');
  assert.strictEqual(translate('(/ x)'), '(x) => (1/x)');
  assert.strictEqual(translate('(- x -5)'), '(x) => (x-(-5))');
  assert.strictEqual(translate('(mod x y)'), '(x, y) => (((x%y)+y)%y)');
  assert.strictEqual(translate('(< x y z)'), '(x, y, z) => (x<y&&y<z)');
  assert.strictEqual(translate('(= x y)'), '(x, y) => (x===y)');
  const f = metavm.createScript('Mod', translate('(mod x y)')).exports;
  assert.strictEqual(f(-1, 5), 4);
  const expected = { message: 'Cannot translate operator: eq' };
  assert.throws(() => translate('(eq x y)'), expected);
});
