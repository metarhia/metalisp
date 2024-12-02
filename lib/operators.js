'use strict';

const { listp, head, tail } = require('./utils.js');

module.exports = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  eq: (a, b) => a === b,
  list: (...list) => (listp(list) ? list : null),
  car: (list) => (listp(list) ? head(list) : null),
  cdr: (list) => (listp(list) ? tail(list) : null),
};
