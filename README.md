# Metarhia LISP DSL

[![ci status](https://github.com/metarhia/metalisp/workflows/Testing%20CI/badge.svg)](https://github.com/metarhia/metalisp/actions?query=workflow%3A%22Testing+CI%22+branch%3Amaster)
[![snyk](https://snyk.io/test/github/metarhia/metalisp/badge.svg)](https://snyk.io/test/github/metarhia/metalisp)
[![npm version](https://badge.fury.io/js/metalisp.svg)](https://badge.fury.io/js/metalisp)
[![npm downloads/month](https://img.shields.io/npm/dm/metalisp.svg)](https://www.npmjs.com/package/metalisp)
[![npm downloads](https://img.shields.io/npm/dt/metalisp.svg)](https://www.npmjs.com/package/metalisp)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/metarhia/metalisp/blob/master/LICENSE)

## Usage

- Install: `npm install metalisp`
- Require: `const metalisp = require('metalisp')`

```js
const { evaluate } = require('metalisp');

const program = '(+ 2 (* x 5) (- y 2))';
const context = { x: 3, y: 7 };
const result = evaluate(program, context);
```

## Operators

- **`+`**: Adds two or more numbers.
- **`-`**: Subtracts the second and subsequent numbers from the first.
- **`*`**: Multiplies two or more numbers.
- **`/`**: Divides the first number by the second and subsequent numbers.
- **`eq`**: Checks for strict equality between two values, returning `true` if equal, `false` otherwise.
- **`list`**: Creates and returns a list (array) of the provided arguments.
- **`car`**: Returns the first element (head) of a list.
- **`cdr`**: Returns the remainder (tail) of a list after removing the first element.

## License & Contributors

Copyright (c) 2017-2024 [Metarhia contributors](https://github.com/metarhia/metalisp/graphs/contributors).
Metalisp is [MIT licensed](./LICENSE).\
Metalisp is a part of [Metarhia](https://github.com/metarhia) technology stack.
