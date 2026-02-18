import react from '@patrikvalkovic/eslint-config/react';
import path from 'path';

export default [
    ...react(
        path.join(import.meta.dirname, 'tsconfig.json'),
        {
            settings: {
                react: {
                    // Hardcode version to avoid context.getFilename() call incompatible with ESLint 10
                    version: '19.2'
                }
            }
        }
    ),
    {
        rules: {
            // eslint-plugin-react@7.x calls APIs removed in ESLint 10 (context.getSourceCode,
            // context.getFilename, sourceCode.isSpaceBetweenTokens). Disable the affected rules.
            // These JSX spacing rules are already covered by @stylistic/eslint-plugin anyway.
            'react/forward-ref-uses-ref': 'off',
            'react/jsx-filename-extension': 'off',
            'react/jsx-tag-spacing': 'off',
            'react/jsx-equals-spacing': 'off',
            'react/jsx-curly-spacing': 'off',
        },
    },
];
