const typescript = require('./build/typescript');
const globals = require('globals');

module.exports = [
    ...typescript({
        tsFilePath: './tsconfig.json',
        languageOptions: {
            globals: globals.node,
        }
    }),
    {
        ignores: [
            'eslint.config.js',
            'build/**/*',
        ],
    },
];

console.log('Configuration read');