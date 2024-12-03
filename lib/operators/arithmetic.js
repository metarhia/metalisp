'use strict';

const gcdPair = (a, b) => {
  const r = a % b;
  if (r === 0) return b;
  return gcdPair(b, r);
};

const gcd = (...list) => {
  if (list.length === 0) return 0;
  if (list.length === 1) return Math.abs(list[0]);
  return list.reduce(gcdPair);
};

//TODO replace Math.abs with a custom "Lisp" implementation
const lcmPair = (a, b) => Math.abs(a * b) / gcdPair(a, b);

const lcm = (...list) => {
  if (list.length === 0) return 1;
  if (list.length === 1) return Math.abs(list[0]);
  return list.reduce(lcmPair);
};

const additionPair = (a, b, ...list) => {
  return a + b;
};

const addition = (...list) => {
  if (list.length === 0) return 0;
  return list.reduce(additionPair);
};

const subtractionPair = (a, b) => a - b;

const subtraction = (...list) => {
  if (list.length === 0) return 0;
  if (list.length === 1) return -list[0];
  return list.reduce(subtractionPair);
};

const multiplicationPair = (a, b) => a * b;

const multiplication = (...list) => {
  if (list.length === 0) return 1;
  return list.reduce(multiplicationPair);
};

const division = (...list) => {
  if (list.length === 0) throw new Error('Division by zero');
  const isZero = (element) => element === 0;
  const hasZero = list.some(isZero);
  if (hasZero) throw new Error('Division by zero');
  if (list.length === 1) return list[0];
  if (list.length === 2) return list[0] / list[1];
  const [first, ...rest] = list;
  return first / multiplication(...rest);
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