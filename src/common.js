export const createEnum = arr => arr.reduce((types, t) => { types[t] = t; return types; }, {});
