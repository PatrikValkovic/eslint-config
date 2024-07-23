import tsEslint from 'typescript-eslint';
// @ts-expect-error typing is missing
import typescriptParser from '@typescript-eslint/parser';
import stylisticPlugin from '@stylistic/eslint-plugin';
import { mergeDeepRight } from 'ramda';
import javascriptConfigs from './javascript';

type Config = Parameters<typeof javascriptConfigs>[0];

const config = ({ tsFilePath, languageOptions, ...jsConfig }: Config) => ([
    ...javascriptConfigs({
        tsFilePath,
        languageOptions,
        ...jsConfig,
    }),
    tsEslint.configs.eslintRecommended,
    ...tsEslint.configs.recommended,
    {
        name: '@patrikvalkovic/eslint-config/typescript',
        languageOptions: mergeDeepRight(
            {
                parser: typescriptParser,
                parserOptions: {
                    project: tsFilePath,
                },
            },
            languageOptions ? languageOptions : {},
        ),
        settings: {
            'eslint-plugin-import/resolver': {
                typescript: {
                    project: [tsFilePath],
                },
            },
        },
        files: [
            '**/*.ts',
        ],
        plugins: {
            '@stylistic': stylisticPlugin,
        },
        rules: {
            //  ╔══════════════════════╗
            //  ║                      ║
            //  ║      @stylistic      ║
            //  ║                      ║
            //  ╚══════════════════════╝
            '@stylistic/member-delimiter-style': 'error',
            '@stylistic/type-annotation-spacing': 'error',
            '@stylistic/type-generic-spacing': 'error',
            '@stylistic/type-named-tuple-spacing': 'error',
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
