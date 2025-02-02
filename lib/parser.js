'use strict';

const {
  NumberExpression,
  BooleanExpression,
  BOOL,
  VariableExpression,
  ConditionExpression,
  OperationExpression,
} = require('./expressions.js');
const { head, tail } = require('./utils.js');

const createPrimitiveExpression = (token) => {
  let PrimitiveExpression;
  if (token in BOOL) PrimitiveExpression = BooleanExpression;
  else if (!isNaN(token)) PrimitiveExpression = NumberExpression;
  else PrimitiveExpression = VariableExpression;
  return new PrimitiveExpression(token);
};

const isConditionExpression = (tokens) => head(tokens) === 'cond';

const createConditionExpression = (tokens, parse) => {
  const clauses = tail(tokens).map((clause) => {
    const condition = parse(head(clause));
    const consequents = tail(clause).map(parse);
    return { condition, consequents };
  });
  return new ConditionExpression(clauses);
};

const createOperationExpression = (tokens, parse) => {
  const operandExpressions = tail(tokens).map(parse);
  return new OperationExpression(head(tokens), operandExpressions);
};

const parse = (tokens) => {
  if (Array.isArray(tokens)) {
    if (isConditionExpression(tokens)) {
      return createConditionExpression(tokens, parse);
    }
    return createOperationExpression(tokens, parse);
  }
  return createPrimitiveExpression(tokens);
};

module.exports = { parse };
