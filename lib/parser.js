'use strict';

const {
  NumberExpression,
  VariableExpression,
  OperationExpression,
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

const parse = (tokens) => {
  if (!Array.isArray(tokens)) {
    const isVar = isNaN(tokens);
    const Expression = isVar ? VariableExpression : NumberExpression;
    return new Expression(tokens);
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
