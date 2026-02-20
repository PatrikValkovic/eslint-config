const typescript = require('./build/typescript');

module.exports = [
    ...typescript('./tsconfig.json'),
    {
        ignores: [
            'eslint.config.js',
            'build/**/*',
            "tests/**/*"
        ],
    },
];

console.log('Configuration read');