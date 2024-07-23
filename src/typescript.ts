import tsEslint from 'typescript-eslint';
// @ts-expect-error typing is missing
import typescriptParser from '@typescript-eslint/parser';
import stylisticPlugin from '@stylistic/eslint-plugin';
import { mergeDeepRight } from 'ramda';
import javascriptConfigs from './javascript';

type Config = Parameters<typeof javascriptConfigs>[0];

const files = [
    '**/*.ts',
];

const config = ({ tsFilePath, languageOptions, ...jsConfig }: Config) => ([
    ...javascriptConfigs({
        tsFilePath,
        languageOptions,
        ...jsConfig,
    }),
    tsEslint.configs.eslintRecommended,
    ...tsEslint.configs.strict.map(tsConfig => ({
        ...tsConfig,
        files,
    })),
    ...tsEslint.configs.stylistic,
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
        files,
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
            '@typescript-eslint/array-type': 'off',
            '@typescript-eslint/ban-ts-comment': [
                'error',
                {
                    'ts-expect-error': 'allow-with-description',
                }
            ],
            '@typescript-eslint/ban-tslint-comment': 'off',
            '@typescript-eslint/class-literal-property-style': 'off',
            '@typescript-eslint/consistent-type-assertions': [
                'error',
                {
                    'assertionStyle': 'as',
                    'objectLiteralTypeAssertions': 'allow-as-parameter',
                }
            ],
            '@typescript-eslint/consistent-type-definitions': 'off',
            '@typescript-eslint/default-param-last': 'error',
            '@typescript-eslint/dot-notation': 'off',
            '@typescript-eslint/method-signature-style': [
                'error',
                'method',
            ],
            '@typescript-eslint/no-empty-interface': [
                'error',
                {
                    'allowSingleExtends': true,
                },
            ],
            '@typescript-eslint/no-empty-object-type': [
                'error',
                {
                    'allowInterfaces': 'with-single-extends',
                }
            ],
            '@typescript-eslint/no-loop-func': 'warn',
            '@typescript-eslint/no-require-imports': 'error',
            '@typescript-eslint/no-shadow': 'warn',
            '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
            '@typescript-eslint/no-unsafe-function-type': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    'varsIgnorePattern': '^_',
                    'argsIgnorePattern': '^_',
                },
            ],
            'no-use-before-define': 'off',
            '@typescript-eslint/no-use-before-define': 'error',
            '@typescript-eslint/no-useless-constructor': 'error',
            '@typescript-eslint/no-useless-empty-export': 'error',
            '@typescript-eslint/no-wrapper-object-types': 'error',
            '@typescript-eslint/prefer-enum-initializers': 'error',
        },
    },
]);

export = config;
