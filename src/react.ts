import typescriptParser from '@typescript-eslint/parser';
import { TSESLint } from '@typescript-eslint/utils';
import typescriptConfig from './typescript';
import { ConfigOrTsPath } from './types';

const config = (config: ConfigOrTsPath): TSESLint.FlatConfig.ConfigArray => ([
    ...typescriptConfig(config),
    {
        name: '@patrikvalkovic/eslint-config/complexity',
        ...(!config ? {} : typeof config === 'string' ? {
            languageOptions: {
                parser: typescriptParser,
                parserOptions: {
                    project: config,
                },
            },
        } : config),
        rules: {
            'jsx-quotes': 'error',
            //  ╔══════════════════════╗
            //  ║                      ║
            //  ║      @stylistic      ║
            //  ║                      ║
            //  ╚══════════════════════╝
            '@stylistic/jsx-closing-bracket-location': 'error',
            '@stylistic/jsx-closing-tag-location': 'error',
            '@stylistic/jsx-curly-newline': ['error', 'consistent'],
            '@stylistic/jsx-curly-spacing': 'error',
            '@stylistic/jsx-equals-spacing': ['error', 'never'],
            '@stylistic/jsx-function-call-newline': 'error',
            '@stylistic/jsx-indent-props': 'error',
            '@stylistic/jsx-max-props-per-line': [
                'warn',
                {
                    'maximum': 3,
                },
            ],
            '@stylistic/jsx-pascal-case': 'error',
            '@stylistic/jsx-props-no-multi-spaces': 'error',
            '@stylistic/jsx-self-closing-comp': 'error',
            '@stylistic/jsx-tag-spacing': 'error',
            '@stylistic/jsx-wrap-multilines': 'error',
        },
    },
]);

export = config;
