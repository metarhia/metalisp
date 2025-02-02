'use strict';

const utils = require('./lib/utils.js');
const tokenizer = require('./lib/tokenizer.js');
const parser = require('./lib/parser.js');
const evaluator = require('./lib/evaluator.js');
const expressions = require('./lib/expressions.js');
const OPERATORS = require('./lib/operators.js');

module.exports = {
  ...utils,
  ...tokenizer,
  ...parser,
  ...evaluator,
  ...expressions,
  OPERATORS,
};
