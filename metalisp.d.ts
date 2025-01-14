export type List = Array<unknown>;
export type Value = number | string;
export type Result = List | Value;
export type Operator = (...list: List) => Result;
export type LispContext = Record<string, unknown>;
export type Clause = { condition: Expression; consequent: Expression[] };

export function listp(list: unknown): boolean;
export function head(list: List): Result;
export function tail(list: List): List;

export const OPERATORS: Record<string, Operator>;

export interface Expression {
  interpret(context: LispContext): Value;
}

export class NumberExpression implements Expression {
  constructor(value: number | string);
  interpret(context: LispContext): number;
}

export class VariableExpression implements Expression {
  constructor(name: string);
  interpret(context: LispContext): Value;
}

export class OperationExpression implements Expression {
  constructor(operator: string, operands: List);
  interpret(context: LispContext): Value;
}

export class ConditionExpression implements Expression {
  constructor(clauses: Clause[]);
  interpret(context: LispContext): Value;
}

export function parse(tokens: string | List): Expression;
export function tokenize(source: string): List;
export function evaluate(input: string, context?: LispContext): Value;
