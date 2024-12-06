'use strict';

const {
  NumberExpression,
  VariableExpression,
  OperationExpression,
  BooleanExpression,
  BOOL,
} = require('./expressions.js');

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
  return stack[0];
};

const expressionFactory = (token) => {
  if (!isNaN(token)) return new NumberExpression(token);
  if (token in BOOL) {
    return new BooleanExpression(token);
  }
  return new VariableExpression(token);
};

const parse = (tokens) => {
  if (!Array.isArray(tokens)) {
    return expressionFactory(tokens);
  }
  const operator = tokens[0];
  const operands = tokens.slice(1);
  const operandExpressions = operands.map((x) => parse(x));
  return new OperationExpression(operator, operandExpressions);
};

const evaluate = (input, context = {}) => {
  const tokens = tokenize(input);
  const expression = parse(tokens);
  return expression.interpret(context);
};

module.exports = { tokenize, parse, evaluate };
