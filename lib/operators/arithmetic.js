'use strict';

const euclideanAlgorithm = (a, b) => {
  if (b === 0) return Math.abs(a);
  return euclideanAlgorithm(b, a % b);
};

const leastCommon = (a, b) => {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a / euclideanAlgorithm(a, b)) * b);
};

const validateIntegers = (list) => {
  if (!list.every(Number.isInteger)) {
    throw new TypeError('Expected integer operands');
  }
};

const gcd = (...list) => {
  validateIntegers(list);
  if (list.length === 0) return 0;
  if (list.length === 1) return Math.abs(list[0]);
  return list.reduce(euclideanAlgorithm);
};

const lcm = (...list) => {
  validateIntegers(list);
  if (list.length === 0) return 1;
  if (list.length === 1) return Math.abs(list[0]);
  return list.reduce(leastCommon);
};

const addition = (...list) => {
  if (list.length === 0) return 0;
  return list.reduce((a, b) => a + b);
};

const subtraction = (...list) => {
  if (list.length === 0) return 0;
  if (list.length === 1) return -list[0];
  return list.reduce((a, b) => a - b);
};

const multiplication = (...list) => {
  if (list.length === 0) return 1;
  return list.reduce((a, b) => a * b);
};

const division = (...list) => {
  if (list.length === 0 || list.includes(0, 1)) {
    throw new Error('Division by zero');
  }
  return list.reduce((a, b) => a / b);
};

module.exports = {
  '+': addition,
  '-': subtraction,
  '*': multiplication,
  '/': division,
  mod: (a, b) => ((a % b) + b) % b,
  rem: (a, b) => a % b,
  incf: (a, b = 1) => a + b,
  decf: (a, b = 1) => a - b,
  '1+': (a) => a + 1,
  '1-': (a) => a - 1,
  gcd,
  lcm,
};
