import tsEslint from 'typescript-eslint';
import * as typescriptParser from '@typescript-eslint/parser';
import stylisticPlugin from '@stylistic/eslint-plugin';
import { mergeDeepRight } from 'ramda';
import javascriptConfigs from './javascript';

type Config = Parameters<typeof javascriptConfigs>[0];

function getLanguageOptions(tsFilePath: string, languageOptions: any) {
    return mergeDeepRight(
        {
            parser: typescriptParser,
            parserOptions: {
                project: tsFilePath,
            },
        },
        languageOptions ? languageOptions : {},
    );
}

const config = ({ tsFilePath, languageOptions, ...jsConfig }: Config) => ([
    ...javascriptConfigs({
        tsFilePath,
        languageOptions: getLanguageOptions(tsFilePath, languageOptions),
        ...jsConfig,
    }),
    tsEslint.configs.eslintRecommended,
    ...tsEslint.configs.strict,
    ...tsEslint.configs.stylistic,
    {
        name: '@patrikvalkovic/eslint-config/typescript',
        languageOptions: getLanguageOptions(tsFilePath, languageOptions),
        settings: {
            'eslint-plugin-import/resolver': {
                typescript: {
                    project: [tsFilePath],
                },
            },
        },
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
        languageOptions: getLanguageOptions(tsFilePath, languageOptions),
        ignores: [
            '**/*.js',
        ],
        rules: {
            '@typescript-eslint/no-require-imports': 'error',
        },
    },
]);

export = config;
