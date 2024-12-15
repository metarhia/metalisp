'use strict';

const {
  NumberExpression,
  VariableExpression,
  OperationExpression,
  ConditionExpression,
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

  const head = tokens[0];
  const tail = tokens.splice(1);

  if (head === 'cond') {
    const clauses = tail.map((clause) => {
      const conditionExpression = parse(clause[0]);
      const consequentExpressions = clause.splice(1).map(parse);

      return {
        condition: conditionExpression,
        consequents: consequentExpressions,
      };
    });

    return new ConditionExpression(clauses);
  }

  const operandExpressions = tail.map(parse);
  return new OperationExpression(head, operandExpressions);
};

const evaluate = (input, context = {}) => {
  const tokens = tokenize(input);
  const expression = parse(tokens);
  return expression.interpret(context);
};

module.exports = { tokenize, parse, evaluate };
