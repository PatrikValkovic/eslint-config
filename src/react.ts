import { configs as reactConfigs, default as reactPlugin } from 'eslint-plugin-react';
// @ts-expect-error typing is missing
import { default as reactHooksPlugin } from 'eslint-plugin-react-hooks';
import { TSESLint } from '@typescript-eslint/utils';
import typescriptParser from '@typescript-eslint/parser';
import { deepMerge } from '@typescript-eslint/utils/eslint-utils';
import globals from 'globals';
import typescriptConfig from './typescript';

type Config = Pick<TSESLint.FlatConfig.Config, 'settings' | 'languageOptions'|'linterOptions'> & {
    settings: {
        react: {
            version: string;
        };
    };
};

type ConfigOrTsPath = Config | string;

const config = (config: ConfigOrTsPath, overrides?: Config) => {
    if (!reactConfigs.flat?.all)
        throw new Error('eslint-plugin-react is missing flat config "all" key');
    const actualConfig = deepMerge(
        typeof config === 'string' ? {
            settings: {
                react: {
                    version: 'detect',
                },
            },
            languageOptions: {
                parser: typescriptParser,
                parserOptions: {
                    project: config,
                    ecmaFeatures: {
                        jsx: true,
                    },
                },
                globals: {
                    ...globals.browser,
                },
            },
        } : config,
        overrides ?? {},
    );
    return [
        ...typescriptConfig(config, overrides),
        reactConfigs.flat.all,
        {
            ...actualConfig,
            name: '@patrikvalkovic/eslint-config/react',
            plugins: {
                'react': reactPlugin,
                'react-hooks': reactHooksPlugin,
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
                //  ╔═════════════════════════╗
                //  ║                         ║
                //  ║      @react plugin      ║
                //  ║                         ║
                //  ╚═════════════════════════╝
                'react/checked-requires-onchange-or-readonly': [
                    'error',
                    {
                        'ignoreMissingProperties': false,
                        'ignoreExclusiveCheckedAttribute': true,
                    },
                ],
                'react/destructuring-assignment': [
                    'error',
                    'always',
                    {
                        'ignoreClassFields': true,
                        'destructureInSignature': 'always',
                    },
                ],
                'react/function-component-definition': [
                    'error',
                    {
                        'namedComponents': 'function-declaration',
                        'unnamedComponents': 'arrow-function',
                    },
                ],
                'react/hook-use-state': [
                    'error',
                    {
                        'allowDestructuredState': true,
                    },
                ],
                'react/jsx-child-element-spacing': 'off',
                'react/jsx-closing-bracket-location': [
                    'error',
                    'line-aligned',
                ],
                'react/jsx-curly-brace-presence': [
                    'error',
                    {
                        'props': 'never',
                        'children': 'never',
                        'propElementValues': 'always',
                    },
                ],
                'react/jsx-max-props-per-line': 'off',
                'react/jsx-newline': 'off',
                'react/jsx-no-literals': 'off',
                'react/jsx-one-expression-per-line': 'off',
                'react/jsx-props-no-spreading': 'off',
                'react/jsx-sort-default-props': 'off',
                'react/jsx-sort-props': 'off',
                'react/jsx-space-before-closing': 'off',
                'react/jsx-no-bind': [
                    'error',
                    {
                        'allowArrowFunctions': true,
                    },
                ],
                'react/no-adjacent-inline-elements': 'off',
                'react/no-multi-comp': [
                    'error',
                    {
                        'ignoreStateless': true,
                    },
                ],
                'react/no-object-type-as-default-prop': 'off',
                'react/no-set-state': 'off',
                'react/require-default-props': 'off',
                'react/require-optimization': 'off',
                'react/sort-comp': 'off',
                'react/sort-default-props': 'off',
                'react/sort-prop-types': 'off',
                // must be setup per project
                'react/forbid-component-props': 'off',
                'react/forbid-dom-props': 'off',
                'react/forbid-elements': 'off',
                'react/jsx-max-depth': 'off',
                'react/no-danger': 'off',
                //  ╔════════════════════════╗
                //  ║                        ║
                //  ║      @react hooks      ║
                //  ║                        ║
                //  ╚════════════════════════╝
                'react-hooks/rules-of-hooks': 'error',
                'react-hooks/exhaustive-deps': 'warn',
            },
        },
    ];
};

export = config;
