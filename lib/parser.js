'use strict';

const { expressions, getExpressionClass } = require('./expressions.js');

const tokenize = (source) => {
  const stack = [];
  const parentStack = [];
  let current = stack;

  const tokens = source
    .replaceAll('(', ' ( ')
    .replaceAll(')', ' ) ')
    .trim()
    .split(/\s+/);

  for (const token of tokens) {
    if (token === '(') {
      const newStack = [];
      current.push(newStack);
      parentStack.push(current);
      current = newStack;
    } else if (token === ')') {
      current = parentStack.pop();
    } else {
      current.push(token);
    }
  }
  return stack;
};

const parse = (tokens) => {
  const Expression = getExpressionClass(tokens);
  if (Expression !== expressions.operation) {
    return new Expression(tokens);
  }
  const operator = tokens[0];
  const operands = tokens.slice(1);
  const operandExpressions = operands.map((x) => parse(x));
  return new Expression(operator, operandExpressions);
};

const evaluate = (input, context = {}) => {
  const forms = tokenize(input);
  let result;
  for (const form of forms) {
    result = parse(form).interpret(context);
  }
  return result;
};

module.exports = { tokenize, parse, evaluate };
