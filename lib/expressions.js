'use strict';

const OPERATORS = require('./operators.js');

class NumberExpression {
  constructor(value) {
    this.value = parseFloat(value);
  }

  interpret() {
    return this.value;
  }
}

class VariableExpression {
  constructor(name) {
    this.name = name;
  }

  interpret(context) {
    if (!(this.name in context)) {
      throw new Error(`Variable "${this.name}" is not defined`);
    }
    return context[this.name];
  }
}

class OperationExpression {
  constructor(operator, operands) {
    this.operator = operator;
    this.operands = operands;
  }

  interpret(context) {
    const toValues = (operand) => operand.interpret(context);
    const args = this.operands.map((x) => toValues(x));
    const operator = OPERATORS[this.operator];
    if (!operator) throw new Error(`Unknown operator: ${operator}`);
    if (this.operator.length > 1) return operator(...args);
    return args.reduce(operator);
  }
}

module.exports = { NumberExpression, VariableExpression, OperationExpression };
