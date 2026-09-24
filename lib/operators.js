'use strict';

const { listp, head, tail } = require('./utils.js');
const arithmetic = require('./operators/arithmetic.js');
const comparison = require('./operators/comparison.js');

module.exports = {
  eq: (a, b) => a === b,
  list: (...list) => (listp(list) ? list : null),
  car: (list) => (listp(list) ? head(list) : null),
  cdr: (list) => (listp(list) ? tail(list) : null),
  ...arithmetic,
  ...comparison,
};
