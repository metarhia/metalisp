'use strict';

const { tokenize } = require('./tokenizer.js');
const { parse } = require('./parser.js');

const evaluate = (input, context = {}) => {
  const tokens = tokenize(input);
  const expression = parse(tokens);
  return expression.interpret(context);
};

module.exports = { evaluate };
