'use strict';

const listp = (list) => Array.isArray(list) && list.length > 0;
const head = (list) => list[0];
const tail = (list) => list.slice(1);

module.exports = { listp, head, tail };
