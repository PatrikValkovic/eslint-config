import tsEslint from 'typescript-eslint';
import * as typescriptParser from '@typescript-eslint/parser';
import stylisticPlugin from '@stylistic/eslint-plugin';
import { TSESLint } from '@typescript-eslint/utils';
import javascriptConfigs from './javascript';
import { ConfigOrTsPath } from './types';

const config = (config: ConfigOrTsPath): TSESLint.FlatConfig.ConfigArray => {
    const configToUse = typeof config === 'string' ? {
        settings: {
            'eslint-plugin-import/resolver': {
                typescript: {
                    project: [config],
                },
                node: true,
            },
        },
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: config,
            },
        },
    } : config;

    return [
        ...javascriptConfigs(configToUse),
        tsEslint.configs.eslintRecommended,
        ...tsEslint.configs.strict,
        ...tsEslint.configs.stylistic,
        {
            name: '@patrikvalkovic/eslint-config/typescript',
            ...configToUse,
            plugins: {
                '@stylistic': stylisticPlugin,
            },
            rules: {
                'no-unused-expression': 'off',
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
                '@typescript-eslint/array-type': 'off',
                '@typescript-eslint/ban-ts-comment': [
                    'error',
                    {
                        'ts-expect-error': 'allow-with-description',
                    },
                ],
                '@typescript-eslint/ban-tslint-comment': 'off',
                '@typescript-eslint/class-literal-property-style': 'off',
                '@typescript-eslint/consistent-type-definitions': 'off',
                '@typescript-eslint/default-param-last': 'error',
                '@typescript-eslint/dot-notation': 'off',
                '@typescript-eslint/method-signature-style': [
                    'error',
                    'method',
                ],
                '@typescript-eslint/no-empty-object-type': [
                    'error',
                    {
                        'allowInterfaces': 'with-single-extends',
                    },
                ],
                '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
                '@typescript-eslint/no-unsafe-function-type': 'error',
                // TODO enable in TSconfig https://stackoverflow.com/a/63767419
                '@typescript-eslint/no-unused-vars': 'off',
                'no-use-before-define': 'off',
                '@typescript-eslint/no-use-before-define': 'error',
                '@typescript-eslint/no-useless-constructor': 'error',
                '@typescript-eslint/no-useless-empty-export': 'error',
                '@typescript-eslint/no-wrapper-object-types': 'error',
                '@typescript-eslint/prefer-enum-initializers': 'error',
                '@typescript-eslint/no-unused-expressions': 'off',
            },
        },
        {
            ...configToUse,
            ignores: [
                '**/*.js',
            ],
            rules: {
                '@typescript-eslint/no-require-imports': 'error',
            },
        },
    ];
};

export = config;
