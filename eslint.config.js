const typescript = require('./build/typescript');
const globals = require('globals');

module.exports = [
    ...typescript('./tsconfig.json'),
    {
        ignores: [
            'eslint.config.js',
            'build/**/*',
        ],
    },
];

console.log('Configuration read');