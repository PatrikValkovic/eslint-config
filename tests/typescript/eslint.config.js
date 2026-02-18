const typescript = require('@patrikvalkovic/eslint-config/typescript');
const path = require('path');

module.exports = [
    ...typescript(path.join(__dirname, 'tsconfig.json'))
];
