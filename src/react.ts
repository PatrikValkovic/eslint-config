// @ts-expect-error typing is missing
import typescriptParser from '@typescript-eslint/parser';
import typescriptConfig from './typescript';

type Config = Parameters<typeof typescriptConfig>[0];

const config = ({ tsFilePath, ...tsConfig }: Config) => ([
    ...typescriptConfig({
        tsFilePath,
        ...tsConfig,
    }),
    {
        name: '@patrikvalkovic/eslint-config/complexity',
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: tsFilePath,
            },
        },
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
