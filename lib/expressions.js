'use strict';

const OPERATORS = require('./operators.js');

const BOOL = {
  t: true,
  nil: false,
  true: true,
  false: false,
};

const NUMBER = /^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i;

const chain = (op) => (args) => {
  if (args.length < 2) return 'true';
  const pairs = args.slice(1).map((b, i) => `${args[i]}${op}${b}`);
  return `(${pairs.join('&&')})`;
};

const atLeastOne = (fn) => (args) => {
  if (args.length === 0) throw new TypeError('Expected at least one number');
  return fn(args);
};

const TRANSLATORS = {
  '+': (args) => (args.length === 0 ? '0' : `(${args.join('+')})`),
  '*': (args) => (args.length === 0 ? '1' : `(${args.join('*')})`),
  '-': atLeastOne((args) => {
    if (args.length === 1) return `(-${args[0]})`;
    return `(${args.join('-')})`;
  }),
  '/': atLeastOne((args) => {
    if (args.length === 1) return `(1/${args[0]})`;
    return `(${args.join('/')})`;
  }),
  mod: ([a, b]) => `(((${a}%${b})+${b})%${b})`,
  rem: ([a, b]) => `(${a}%${b})`,
  '=': chain('==='),
  '<': chain('<'),
  '>': chain('>'),
  '<=': chain('<='),
  '>=': chain('>='),
};

class BooleanExpression {
  constructor(value) {
    this.type = 'boolean';
    if (!Object.hasOwn(BOOL, value)) {
      throw new Error(`Unknown boolean value: ${value}`);
    }
    this.value = BOOL[value];
  }

  interpret() {
    return this.value;
  }
}

class NumberExpression {
  constructor(value) {
    this.type = 'number';
    this.value = parseFloat(value);
  }

  interpret() {
    return this.value;
  }

  toExpression() {
    return this.value < 0 ? `(${this.value})` : `${this.value}`;
  }

  toJavaScript() {
    return `() => ${this.toExpression()}`;
  }
}

class VariableExpression {
  constructor(name) {
    this.type = 'variable';
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
  constructor(operator, operands) {
    this.type = 'operation';
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
    if (!Object.hasOwn(OPERATORS, this.operator)) {
      throw new Error(`Unknown operator: ${this.operator}`);
    }
    return OPERATORS[this.operator](...args);
  }

  toExpression() {
    if (!Object.hasOwn(TRANSLATORS, this.operator)) {
      throw new Error(`Cannot translate operator: ${this.operator}`);
    }
    const list = this.operands.map((x) => x.toExpression());
    return TRANSLATORS[this.operator](list);
  }

  toJavaScript() {
    const parameters = Array.from(this.identifiers);
    const header = `(${parameters.join(', ')})`;
    return `${header} => ${this.toExpression()}`;
  }
}

const expressions = {
  number: NumberExpression,
  variable: VariableExpression,
  boolean: BooleanExpression,
  operation: OperationExpression,
};

const getExpressionClass = (token) => {
  if (Array.isArray(token)) return expressions.operation;
  if (NUMBER.test(token)) return expressions.number;
  if (Object.hasOwn(BOOL, token)) return expressions.boolean;
  return expressions.variable;
};

module.exports = {
  NumberExpression,
  VariableExpression,
  OperationExpression,
  BooleanExpression,
  BOOL,
  expressions,
  getExpressionClass,
};
