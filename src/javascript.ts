import eslint from '@eslint/js';
// @ts-expect-error typing is missing
import noOnlyTestsPlugin from 'eslint-plugin-no-only-tests';
import patrikImportRulePlugin from '@patrikvalkovic/eslint-plugin-import-rule';
import stylisticPlugin from '@stylistic/eslint-plugin';
// @ts-expect-error typing is missing
import * as  importPlugin from 'eslint-plugin-import';

const isFixMode = process.argv.includes('--fix');

type Config = {
    tsFilePath: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    languageOptions?: any;
};

const config = ({ tsFilePath, languageOptions }: Config) => ([
    eslint.configs.recommended,
    {
        name: '@patrikvalkovic/eslint-config/javascript',
        settings: {
            'eslint-plugin-import/resolver': {
                typescript: {
                    project: [tsFilePath],
                },
                node: true,
            },
        },
        ...(languageOptions && { languageOptions }),
        plugins: {
            '@stylistic': stylisticPlugin,
            'eslint-plugin-import': importPlugin,
            'eslint-plugin-no-only-tests': noOnlyTestsPlugin,
            '@patrikvalkovic/import-rule': patrikImportRulePlugin,
        },
        rules: {
            //  ╔════════════════════╗
            //  ║                    ║
            //  ║      Problems      ║
            //  ║                    ║
            //  ╚════════════════════╝
            'array-callback-return': 'error',
            'no-await-in-loop': 'warn',
            'no-constructor-return': 'error',
            'no-duplicate-imports': 'error',
            'no-inner-declarations': 'error',
            'no-self-compare': 'error',
            'no-template-curly-in-string': 'warn',
            'no-unmodified-loop-condition': 'error',
            'no-unreachable-loop': 'error',
            'no-use-before-define': 'error',
            //  ╔═══════════════════════╗
            //  ║                       ║
            //  ║      Suggestions      ║
            //  ║                       ║
            //  ╚═══════════════════════╝
            'arrow-body-style': 'error',
            'block-scoped-var': 'error',
            'consistent-return': 'error',
            'consistent-this': 'error',
            'curly': [
                'error',
                'multi-or-nest',
                'consistent',
            ],
            'default-case': 'error',
            'default-case-last': 'error',
            'default-param-last': 'error',
            'dot-notation': 'warn',
            'eqeqeq': 'error',
            'grouped-accessor-pairs': 'error',
            'guard-for-in': 'warn',
            'logical-assignment-operators': 'error',
            'new-cap': 'error',
            'no-array-constructor': 'error',
            'no-caller': 'error',
            'no-console': 'error',
            'no-else-return': 'warn',
            'no-empty-function': [
                'error',
                {
                    'allow': ['constructors'],
                },
            ],
            'no-eq-null': 'error',
            'no-extra-bind': 'warn',
            'no-extra-label': 'error',
            'no-implicit-coercion': [
                'error',
                {
                    'allow': [
                        '!!',
                    ],
                },
            ],
            'no-implied-eval': 'error',
            'no-invalid-this': 'error',
            'no-labels': 'error',
            'no-lone-blocks': 'warn',
            'no-lonely-if': 'error',
            'no-multi-str': 'error',
            'no-new': 'warn',
            'no-new-func': 'error',
            'no-new-wrappers': 'error',
            'no-object-constructor': 'error',
            'no-param-reassign': 'error',
            'no-restricted-exports': [
                'error',
                {
                    'restrictedNamedExports': [
                        'module',
                    ],
                },
            ],
            'no-return-assign': 'error',
            'no-sequences': 'error',
            'no-throw-literal': 'error',
            'no-undef-init': 'error',
            'no-unneeded-ternary': 'error',
            'no-unused-expressions': 'error',
            'no-useless-call': 'error',
            'no-useless-computed-key': 'error',
            'no-useless-concat': 'error',
            'no-useless-constructor': 'off',
            'no-useless-rename': 'error',
            'no-useless-return': 'error',
            'no-var': 'error',
            'one-var': [
                'error',
                'never',
            ],
            'operator-assignment': 'error',
            'prefer-arrow-callback': 'error',
            'prefer-const': [
                'error',
                {
                    'ignoreReadBeforeAssign': true,
                },
            ],
            'prefer-destructuring': [
                'error',
                {
                    'VariableDeclarator': {
                        'array': false,
                        'object': true,
                    },
                    'AssignmentExpression': {
                        'array': false,
                        'object': false,
                    },
                },
            ],
            'prefer-named-capture-group': 'error',
            'prefer-numeric-literals': 'error',
            'prefer-object-spread': 'error',
            'prefer-promise-reject-errors': 'warn',
            'prefer-rest-params': 'error',
            'prefer-spread': 'error',
            'prefer-template': 'error',
            'radix': 'error',
            'sort-imports': 'off',
            'spaced-comment': 'error',
            'strict': 'off',
            'yoda': 'error',
            //  ╔══════════════════════╗
            //  ║                      ║
            //  ║      @stylistic      ║
            //  ║                      ║
            //  ╚══════════════════════╝
            'unicode-bom': 'error',
            '@stylistic/array-bracket-newline': [
                'error',
                'consistent',
            ],
            '@stylistic/array-bracket-spacing': [
                'error',
                'never',
            ],
            '@stylistic/array-element-newline': [
                'error',
                'consistent',
            ],
            '@stylistic/arrow-parens': [
                'error',
                'as-needed',
            ],
            '@stylistic/arrow-spacing': [
                'error',
                {
                    'before': true,
                    'after': true,
                },
            ],
            '@stylistic/block-spacing': 'error',
            '@stylistic/brace-style': 'error',
            '@stylistic/comma-dangle': [
                'error',
                'always-multiline',
            ],
            '@stylistic/comma-spacing': 'error',
            '@stylistic/comma-style': 'error',
            '@stylistic/computed-property-spacing': 'error',
            '@stylistic/dot-location': ['error', 'property'],
            '@stylistic/eol-last': 'error',
            '@stylistic/func-call-spacing': 'error',
            '@stylistic/function-call-argument-newline': ['error', 'consistent'],
            '@stylistic/function-call-spacing': 'error',
            '@stylistic/generator-star-spacing': ['error', 'after'],
            '@stylistic/indent': [
                'error',
                4,
                {
                    'SwitchCase': 0,
                },
            ],
            '@stylistic/key-spacing': [
                'error',
                {
                    'mode': 'minimum',
                },
            ],
            '@stylistic/keyword-spacing': 'error',
            '@stylistic/linebreak-style': 'error',
            '@stylistic/lines-between-class-members': [
                'error',
                'always',
                {
                    'exceptAfterSingleLine': true,
                },
            ],
            '@stylistic/new-parens': 'error',
            // TODO I want this to either keep everything on the same line, or on a separate line
            // Currently it keeps 3 on the same line and then just split the last one
            // '@stylistic/newline-per-chained-call': [
            //     'warn',
            //     {
            //         'ignoreChainWithDepth': 3,
            //     },
            // ],
            '@stylistic/no-confusing-arrow': 'error',
            '@stylistic/no-extra-semi': 'error',
            '@stylistic/no-floating-decimal': 'error',
            '@stylistic/no-tabs': 'error',
            '@stylistic/no-trailing-spaces': 'error',
            '@stylistic/no-whitespace-before-property': 'error',
            '@stylistic/nonblock-statement-body-position': [
                'error',
                'below',
            ],
            '@stylistic/object-curly-newline': [
                'error',
                {
                    'consistent': true,
                },
            ],
            '@stylistic/object-curly-spacing': [
                'error',
                'always',
            ],
            '@stylistic/object-property-newline': [
                'error',
                {
                    'allowAllPropertiesOnSameLine': true,
                },
            ],
            '@stylistic/operator-linebreak': [
                'error',
                'after',
                {
                    'overrides': {
                        '?': 'before',
                        ':': 'before',
                    },
                },
            ],
            '@stylistic/quotes': [
                'error',
                'single',
                {
                    'allowTemplateLiterals': true,
                },
            ],
            '@stylistic/rest-spread-spacing': 'error',
            '@stylistic/semi': 'error',
            '@stylistic/semi-spacing': 'error',
            '@stylistic/semi-style': 'error',
            '@stylistic/space-before-blocks': 'error',
            '@stylistic/space-before-function-paren': [
                'error',
                {
                    'anonymous': 'never',
                    'named': 'never',
                    'asyncArrow': 'always',
                },
            ],
            '@stylistic/space-in-parens': 'error',
            '@stylistic/space-unary-ops': [
                'error',
                {
                    'words': true,
                    'nonwords': false,
                },
            ],
            '@stylistic/spaced-comment': 'error',
            '@stylistic/switch-colon-spacing': 'error',
            '@stylistic/template-curly-spacing': 'error',
            '@stylistic/template-tag-spacing': 'error',
            '@stylistic/wrap-iife': [
                'error',
                'inside',
            ],
            '@stylistic/wrap-regex': 'error',
            '@stylistic/yield-star-spacing': 'error',
            //  ╔═══════════════════╗
            //  ║                   ║
            //  ║      IMPORTS      ║
            //  ║                   ║
            //  ╚═══════════════════╝
            'eslint-plugin-import/export': 'error',
            'eslint-plugin-import/no-empty-named-blocks': 'error',
            // TODO uncomment when it is ready for eslint v9
            // "eslint-plugin-import/no-mutable-exports": "warn",
            // 'eslint-plugin-import/no-named-as-default-member': 'warn',
            // 'eslint-plugin-import/newline-after-import': 'error',
            // 'eslint-plugin-import/no-amd': 'error',
            // 'eslint-plugin-import/first': 'error',
            'eslint-plugin-import/default': 'error',
            'eslint-plugin-import/named': 'error',
            'eslint-plugin-import/no-absolute-path': 'error',
            'eslint-plugin-import/no-self-import': 'error',
            'eslint-plugin-import/no-useless-path-segments': 'error',
            'eslint-plugin-import/no-duplicates': 'error',
            'eslint-plugin-import/order': [
                'error',
                {
                    'newlines-between': 'never',
                },
            ],
            // 'eslint-plugin-unused-imports/no-unused-imports': isFixMode ? 'error' : 'off',
            '@patrikvalkovic/import-rule/format-import': 'error',
            //  ╔═════════════════════════════════╗
            //  ║                                 ║
            //  ║      Tests and Test runner      ║
            //  ║                                 ║
            //  ╚═════════════════════════════════╝
            'eslint-plugin-no-only-tests/no-only-tests': 'error',
        },
    },
]);

export = config;
