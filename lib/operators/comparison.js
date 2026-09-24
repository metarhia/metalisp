'use strict';

const isNumber = (value) => typeof value === 'number' && !Number.isNaN(value);

const validate = (values) => {
  if (values.length === 0) {
    throw new TypeError('Expected at least one number');
  }
  if (!values.every(isNumber)) {
    throw new TypeError('Expected numeric operands');
  }
};

const compare =
  (predicate) =>
  (...values) => {
    validate(values);
    for (let i = 1; i < values.length; i++) {
      if (!predicate(values[i - 1], values[i])) return false;
    }
    return true;
  };

const distinct = (...values) => {
  validate(values);
  return new Set(values).size === values.length;
};
module.exports = {
  '=': compare((a, b) => a === b),
  '>': compare((a, b) => a > b),
  '<': compare((a, b) => a < b),
  '>=': compare((a, b) => a >= b),
  '<=': compare((a, b) => a <= b),
  '/=': distinct,
};
