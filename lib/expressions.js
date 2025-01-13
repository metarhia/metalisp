'use strict';

const OPERATORS = require('./operators.js');

const BOOL = {
  t: true,
  nil: false,
  true: true,
  false: false,
};

class BooleanExpression {
  type = 'boolean';

  constructor(value) {
    if (!(value in BOOL)) {
      throw new Error(`Unknown boolean value: ${value}`);
    }
    this.value = BOOL[value];
  }

  interpret() {
    return this.value;
  }
}

class NumberExpression {
  type = 'number';

  constructor(value) {
    this.value = parseFloat(value);
  }

  interpret() {
    return this.value;
  }

  toExpression() {
    return this.value;
  }

  toJavaScript() {
    return `() => ${this.value}`;
  }
}

class VariableExpression {
  type = 'variable';

  constructor(name) {
    this.name = name;
  }

  interpret(context) {
    if (!(this.name in context)) {
      throw new Error(`Variable "${this.name}" is not defined`);
    }
    return context[this.name];
  }

  toExpression() {
    return this.name;
  }

  toJavaScript() {
    return `(${this.name}) => ${this.name}`;
  }
}

class OperationExpression {
  type = 'operation';

  constructor(operator, operands) {
    this.identifiers = new Set();
    this.operator = operator;
    this.operands = operands;
    for (const operand of operands) {
      if (operand instanceof VariableExpression) {
        this.identifiers.add(operand.name);
      } else if (operand instanceof OperationExpression) {
        for (const name of operand.identifiers.values()) {
          this.identifiers.add(name);
        }
      }
    }
  }

  interpret(context) {
    const args = this.operands.map((x) => x.interpret(context));
    const operator = OPERATORS[this.operator];
    if (!operator) throw new Error(`Unknown operator: ${operator}`);
    return operator(...args);
  }

  toExpression() {
    const list = this.operands.map((x) => x.toExpression());
    return '(' + list.join(this.operator) + ')';
  }

  toJavaScript() {
    const parameters = Array.from(this.identifiers);
    const header = '(' + parameters.join(', ') + ')';
    return header + ' => ' + this.toExpression();
  }
}

const expressions = {
  number: NumberExpression,
  variable: VariableExpression,
  boolean: BooleanExpression,
  operation: OperationExpression,
};

const expressionType = {
  number: 'number',
  variable: 'variable',
  operation: 'operation',
  boolean: 'boolean',
};

const getExpressionType = (token) => {
  if (Array.isArray(token)) return expressionType.operation;
  if (!isNaN(token)) return expressionType.number;
  if (token in BOOL) return expressionType.boolean;
  return expressionType.variable;
};

module.exports = {
  NumberExpression,
  VariableExpression,
  OperationExpression,
  BooleanExpression,
  BOOL,
  expressions,
  expressionType,
  getExpressionType,
};
