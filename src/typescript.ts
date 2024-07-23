import tsEslint from 'typescript-eslint';
// @ts-expect-error typing is missing
import typescriptParser from '@typescript-eslint/parser';
import javascriptConfigs from './javascript';

const config = (tsFilePath: string) => ([
    ...javascriptConfigs(tsFilePath),
    tsEslint.configs.eslintRecommended,
    ...tsEslint.configs.recommended,
    {
        name: '@patrikvalkovic/eslint-config/typescript',
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: tsFilePath,
            },
        },
        settings: {
            'eslint-plugin-import/resolver': {
                typescript: {
                    project: [tsFilePath],
                },
            },
        },
        plugins: {
        },
        rules: {
            //  ╔══════════════════════════════╗
            //  ║                              ║
            //  ║      TypeScript related      ║
            //  ║                              ║
            //  ╚══════════════════════════════╝
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    'prefer': 'no-type-imports',
                },
            ],
            // "@typescript-eslint/member-delimiter-style": "error", // TODO stylistic
            '@typescript-eslint/method-signature-style': [
                'error',
                'method',
            ],
            '@typescript-eslint/no-empty-interface': 'off',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-require-imports': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    'varsIgnorePattern': '^_',
                    'argsIgnorePattern': '^_',
                },
            ],
            '@typescript-eslint/prefer-enum-initializers': 'error',
            // "@typescript-eslint/type-annotation-spacing": "error", // TODO stylistic
            //  ╔═════════════════════════════════╗
            //  ║                                 ║
            //  ║      Typescript strict rules    ║
            //  ║         without type check      ║
            //  ║                                 ║
            //  ╚═════════════════════════════════╝
            '@typescript-eslint/ban-tslint-comment': 'error',
            '@typescript-eslint/class-literal-property-style': 'error',
            '@typescript-eslint/consistent-generic-constructors': 'error',
            '@typescript-eslint/consistent-indexed-object-style': 'error',
            '@typescript-eslint/consistent-type-assertions': 'error',
            '@typescript-eslint/consistent-type-definitions': 'off',
            '@typescript-eslint/no-confusing-non-null-assertion': 'error',
            '@typescript-eslint/no-duplicate-enum-values': 'error',
            '@typescript-eslint/no-dynamic-delete': 'error',
            '@typescript-eslint/no-extraneous-class': 'error',
            '@typescript-eslint/no-invalid-void-type': 'error',
            '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
            '@typescript-eslint/no-useless-constructor': 'error',
            '@typescript-eslint/prefer-for-of': 'error',
            '@typescript-eslint/prefer-function-type': 'error',
            '@typescript-eslint/prefer-literal-enum-member': 'error',
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/prefer-ts-expect-error': 'error',
            '@typescript-eslint/unified-signatures': 'error',
        },
    },
]);

export = config;
