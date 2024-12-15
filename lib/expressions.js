'use strict';

const OPERATORS = require('./operators.js');

class NumberExpression {
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
  constructor(name) {
    this.name = name;
    this.identifiers = [name];
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
  #identifiers = new Set();

  constructor(operator, operands) {
    this.operator = operator;
    this.operands = operands;

    for (const operand of operands) {
      if (operand.identifiers !== undefined) {
        for (const name of operand.identifiers) {
          this.#identifiers.add(name);
        }
      }
    }
  }

  get identifiers() {
    return Array.from(this.#identifiers);
  }

  interpret(context) {
    const args = this.operands.map((x) => x.interpret(context));
    const operator = OPERATORS[this.operator];
    if (!operator) throw new Error(`Unknown operator: ${this.operator}`);
    if (this.operator.length > 1) return operator(...args);
    return args.reduce(operator);
  }

  toExpression() {
    const list = this.operands.map((x) => x.toExpression());
    return '(' + list.join(this.operator) + ')';
  }

  toJavaScript() {
    const header = `(${this.identifiers.join(', ')})`;
    return `${header} => ${this.toExpression()}`;
  }
}

class ConditionExpression {
  #identifiers = new Set();

  constructor(clauses) {
    this.clauses = clauses;

    for (const { condition, consequents } of clauses) {
      const conditionIdentifiers = condition.identifiers ?? [];
      const consequentIdentifiers = consequents.flatMap(
        (consequent) => consequent.identifiers ?? [],
      );

      for (const name of [...conditionIdentifiers, ...consequentIdentifiers]) {
        this.#identifiers.add(name);
      }
    }
  }

  get identifiers() {
    return Array.from(this.#identifiers);
  }

  // eslint-disable-next-line consistent-return
  interpret(context) {
    for (const { condition, consequents } of this.clauses) {
      if (condition.interpret(context) !== false) {
        return consequents.reduce(
          (_, consequent) => consequent.interpret(context),
          undefined,
        );
      }
    }
  }

  toExpression() {
    const ifExpressions = this.clauses.map(({ condition, consequents }) => {
      const ifExpression = `if ${condition.toExpression()}`;

      const consequentExpressions = consequents.map((consequent, i) =>
        i === consequents.length - 1
          ? `return ${consequent.toExpression()};`
          : `${consequent.toExpression()};`,
      );

      return `${ifExpression} {${consequentExpressions.join(' ')}}`;
    });

    return ifExpressions.join(' ');
  }

  toJavaScript() {
    const header = `(${this.identifiers.join(', ')})`;
    return `${header} => {${this.toExpression()}}`;
  }
}

module.exports = {
  NumberExpression,
  VariableExpression,
  OperationExpression,
  ConditionExpression,
};
