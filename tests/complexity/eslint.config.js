const complexity = require('@patrikvalkovic/eslint-config/complexity');
const path = require('path');

module.exports = [...complexity(path.join(__dirname, 'tsconfig.json'))];
