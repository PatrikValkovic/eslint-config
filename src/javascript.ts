import eslint from '@eslint/js';
// @ts-expect-error typing is missing
import noOnlyTestsPlugin from 'eslint-plugin-no-only-tests';
// @ts-expect-error typing is missing
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import patrikImportRulePlugin from '@patrikvalkovic/eslint-plugin-import-rule';
// eslint-disable-next-line @typescript-eslint/no-require-imports Must be required because it doesn't yet support new eslint
const importPlugin = require('eslint-plugin-import');

const isFixMode = process.argv.includes('--fix');

const config = (tsFilePath: string) => ([
    eslint.configs.recommended,
    {
        name: '@patrikvalkovic/eslint-config/javascript',
        settings: {
            'eslint-plugin-import/resolver': {
                typescript: {
                    project: [tsFilePath],
                },
            },
        },
        plugins: {
            'eslint-plugin-import': importPlugin,
            'eslint-plugin-no-only-tests': noOnlyTestsPlugin,
            'eslint-plugin-unused-imports': unusedImportsPlugin,
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
            'no-promise-executor-return': 'error',
            'no-self-compare': 'error',
            'no-template-curly-in-string': 'warn',
            'no-unmodified-loop-condition': 'error',
            'no-unreachable-loop': 'error',
            'no-use-before-define': 'error',
            'no-useless-assignment': 'error',
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
            'no-loop-func': 'warn',
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
            'no-shadow': 'warn',
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
            'array-bracket-newline': [
                'error',
                'consistent',
            ],
            'array-bracket-spacing': [
                'error',
                'never',
            ],
            'array-element-newline': [
                'error',
                'consistent',
            ],
            'arrow-parens': [
                'error',
                'as-needed',
            ],
            'arrow-spacing': [
                'error',
                {
                    'before': true,
                    'after': true,
                },
            ],
            'block-spacing': 'error',
            'brace-style': 'error',
            'comma-dangle': [
                'error',
                {
                    'arrays': 'always-multiline',
                    'objects': 'always-multiline',
                    'imports': 'always-multiline',
                    'exports': 'always-multiline',
                    'functions': 'always-multiline',
                },
            ],
            'comma-spacing': 'error',
            'comma-style': 'error',
            'eol-last': 'error',
            'func-call-spacing': 'error',
            'key-spacing': [
                'error',
                {
                    'mode': 'minimum',
                },
            ],
            'keyword-spacing': 'error',
            'linebreak-style': 'error',
            'lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }],
            'no-confusing-arrow': 'error',
            'no-floating-decimal': 'error',
            'no-tabs': 'error',
            'no-trailing-spaces': 'error',
            'no-whitespace-before-property': 'error',
            'nonblock-statement-body-position': [
                'error',
                'below',
            ],
            'object-curly-newline': [
                'error',
                {
                    'consistent': true,
                },
            ],
            'object-curly-spacing': [
                'error',
                'always',
            ],
            'object-property-newline': [
                'error',
                {
                    'allowAllPropertiesOnSameLine': true,
                },
            ],
            'quotes': [
                'error',
                'single',
                {
                    'allowTemplateLiterals': true,
                },
            ],
            'indent': ['error', 4],
            'rest-spread-spacing': 'error',
            'semi': 'error',
            'semi-spacing': 'error',
            'semi-style': 'error',
            'space-before-blocks': 'error',
            'space-before-function-paren': [
                'error',
                {
                    'anonymous': 'never',
                    'named': 'never',
                    'asyncArrow': 'always',
                },
            ],
            'space-in-parens': 'error',
            'space-unary-ops': [
                'error',
                {
                    'words': true,
                    'nonwords': false,
                },
            ],
            'switch-colon-spacing': 'error',
            'template-curly-spacing': 'error',
            'template-tag-spacing': 'error',
            'unicode-bom': 'error',
            'wrap-iife': [
                'error',
                'inside',
            ],
            'yield-star-spacing': 'error',
            //  ╔═══════════════════╗
            //  ║                   ║
            //  ║      IMPORTS      ║
            //  ║                   ║
            //  ╚═══════════════════╝
            'eslint-plugin-import/first': 'error',
            'eslint-plugin-import/no-absolute-path': 'error',
            'eslint-plugin-import/no-duplicates': 'error',
            // "eslint-plugin-import/no-mutable-exports": "warn", // TODO uncomment when it is ready for eslint v9
            'eslint-plugin-import/no-unresolved': 'error',
            'eslint-plugin-import/no-useless-path-segments': 'error',
            'eslint-plugin-import/order': [
                'error',
                {
                    'newlines-between': 'never',
                },
            ],
            'eslint-plugin-unused-imports/no-unused-imports': isFixMode ? 'error' : 'off',
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
