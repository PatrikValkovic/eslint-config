import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";
// @ts-expect-error typing is missing
import typescriptParser from "@typescript-eslint/parser";
// @ts-expect-error typing is missing
import noOnlyTestsPlugin from "eslint-plugin-no-only-tests";
// @ts-expect-error typing is missing
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import patrikImportRulePlugin from "@patrikvalkovic/eslint-plugin-import-rule";
const importPlugin = require("eslint-plugin-import");

const isFixMode = process.argv.includes("--fix");

const config = (tsFilePath: string) => ([
    eslint.configs.recommended,
    tsEslint.configs.eslintRecommended,
    ...tsEslint.configs.recommended,
    {
        name: '@patrikvalkovic/eslint-config/typescript',
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: tsFilePath,
            }
        },
        settings: {
            "eslint-plugin-import/resolver": {
                typescript: {
                    project: [ tsFilePath ],
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
            "array-callback-return": "error",
            "no-await-in-loop": "warn",
            "no-constant-binary-expression": "error",
            "no-constructor-return": "error",
            "no-duplicate-imports": "error",
            "no-self-compare": "error",
            "no-template-curly-in-string": "warn",
            "no-unmodified-loop-condition": "error",
            "no-unreachable-loop": "error",
            "no-unused-private-class-members": "error",
            "no-use-before-define": "error",
            //  ╔═══════════════════════╗
            //  ║                       ║
            //  ║      Suggestions      ║
            //  ║                       ║
            //  ╚═══════════════════════╝
            "arrow-body-style": "error",
            "consistent-return": "error",
            "curly": [
                "error",
                "multi-or-nest",
                "consistent",
            ],
            "default-case": "error",
            "default-case-last": "error",
            "default-param-last": "error",
            "eqeqeq": "warn",
            "dot-notation": "warn",
            "no-array-constructor": "warn",
            "no-caller": "error",
            "no-console": "error",
            "no-confusing-arrow": "error",
            "no-else-return": "warn",
            "no-empty-function": [
                "error",
                {
                    "allow": ["constructors"],
                },
            ],
            "no-eq-null": "error",
            "no-extra-bind": "warn",
            "no-floating-decimal": "error",
            "no-labels": "error",
            "no-implicit-coercion": [
                "error",
                {
                    "allow": [
                        "!!",
                    ],
                },
            ],
            "no-implied-eval": "error",
            "no-invalid-this": "error",
            "no-lone-blocks": "warn",
            "no-lonely-if": "error",
            "no-multi-str": "error",
            "no-new-func": "error",
            "no-new-object": "error",
            "no-param-reassign": "error",
            "no-restricted-exports": [
                "error",
                {
                    "restrictedNamedExports": [
                        "module",
                    ],
                },
            ],
            "no-return-assign": "error",
            "no-sequences": "error",
            "no-throw-literal": "error",
            "no-undef-init": "error",
            "no-unneeded-ternary": "error",
            "no-useless-call": "error",
            "no-useless-computed-key": "error",
            "no-useless-concat": "error",
            "no-useless-constructor": "off",
            "no-useless-rename": "error",
            "no-useless-return": "error",
            "no-var": "error",
            "object-shorthand": "warn",
            "one-var": [
                "error",
                "never",
            ],
            "operator-assignment": "warn",
            "prefer-arrow-callback": "error",
            "prefer-const": [
                "error",
                {
                    "ignoreReadBeforeAssign": true,
                },
            ],
            "prefer-destructuring": [
                "error",
                {
                    "VariableDeclarator": {
                        "array": false,
                        "object": true,
                    },
                    "AssignmentExpression": {
                        "array": false,
                        "object": false,
                    },
                },
            ],
            "prefer-exponentiation-operator": "error",
            "prefer-numeric-literals": "error",
            "prefer-object-spread": "warn",
            "prefer-promise-reject-errors": "warn",
            "prefer-rest-params": "error",
            "prefer-template": "error",
            "radix": "warn",
            "sort-imports": "off",
            "spaced-comment": "error",
            "strict": "off",
            "yoda": "error",
            //  ╔══════════════════════╗
            //  ║                      ║
            //  ║      FORMATTING      ║
            //  ║                      ║
            //  ╚══════════════════════╝
            "array-bracket-newline": [
                "error",
                "consistent",
            ],
            "array-bracket-spacing": [
                "error",
                "never",
            ],
            "array-element-newline": [
                "error",
                "consistent",
            ],
            "arrow-parens": [
                "error",
                "as-needed",
            ],
            "arrow-spacing": [
                "error",
                {
                    "before": true,
                    "after": true,
                },
            ],
            "block-spacing": "error",
            "brace-style": "error",
            "comma-dangle": [
                "error",
                {
                    "arrays": "always-multiline",
                    "objects": "always-multiline",
                    "imports": "always-multiline",
                    "exports": "always-multiline",
                    "functions": "always-multiline",
                },
            ],
            "comma-spacing": "error",
            "comma-style": "error",
            "eol-last": "error",
            "func-call-spacing": "error",
            "key-spacing": [
                "error",
                {
                    "mode": "minimum",
                },
            ],
            "keyword-spacing": "error",
            "linebreak-style": "error",
            "lines-between-class-members": ["error", "always", {"exceptAfterSingleLine": true}],
            "no-tabs": "error",
            "no-trailing-spaces": "error",
            "no-whitespace-before-property": "error",
            "nonblock-statement-body-position": [
                "error",
                "below",
            ],
            "object-curly-newline": [
                "error",
                {
                    "consistent": true,
                },
            ],
            "object-curly-spacing": [
                "error",
                "always",
            ],
            "object-property-newline": [
                "error",
                {
                    "allowAllPropertiesOnSameLine": true,
                },
            ],
            "quotes": [
                "error",
                "single",
                {
                    "allowTemplateLiterals": true,
                },
            ],
            "indent": ["error", 4],
            "rest-spread-spacing": "error",
            "semi": "error",
            "semi-spacing": "error",
            "semi-style": "error",
            "space-before-blocks": "error",
            "space-before-function-paren": [
                "error",
                {
                    "anonymous": "never",
                    "named": "never",
                    "asyncArrow": "always",
                },
            ],
            "space-in-parens": "error",
            "space-unary-ops": [
                "error",
                {
                    "words": true,
                    "nonwords": false,
                },
            ],
            "switch-colon-spacing": "error",
            "template-curly-spacing": "error",
            "template-tag-spacing": "error",
            "unicode-bom": "error",
            "wrap-iife": [
                "error",
                "inside",
            ],
            "yield-star-spacing": "error",
            //  ╔═══════════════════╗
            //  ║                   ║
            //  ║      IMPORTS      ║
            //  ║                   ║
            //  ╚═══════════════════╝
            "eslint-plugin-import/first": "error",
            "eslint-plugin-import/no-absolute-path": "error",
            "eslint-plugin-import/no-duplicates": "error",
            //"eslint-plugin-import/no-mutable-exports": "warn", // TODO uncomment when it is ready for eslint v9
            "eslint-plugin-import/no-unresolved": "error",
            "eslint-plugin-import/no-useless-path-segments": "error",
            "eslint-plugin-import/order": [
                "error",
                {
                    "newlines-between": "never",
                },
            ],
            "eslint-plugin-unused-imports/no-unused-imports": isFixMode ? "error" : "off",
            "@patrikvalkovic/import-rule/format-import": "error",
            //  ╔══════════════════════════════╗
            //  ║                              ║
            //  ║      TypeScript related      ║
            //  ║                              ║
            //  ╚══════════════════════════════╝
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/consistent-type-imports": [
                "error",
                {
                    "prefer": "no-type-imports"
                }
            ],
            // "@typescript-eslint/member-delimiter-style": "error", // TODO stylistic
            "@typescript-eslint/method-signature-style": [
                "error",
                "method",
            ],
            "@typescript-eslint/no-empty-interface": "off",
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/no-require-imports": "error",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    "varsIgnorePattern": "^_",
                    "argsIgnorePattern": "^_"
                }
            ],
            "@typescript-eslint/prefer-enum-initializers": "error",
            // "@typescript-eslint/type-annotation-spacing": "error", // TODO stylistic
            //  ╔═════════════════════════════════╗
            //  ║                                 ║
            //  ║      Typescript strict rules    ║
            //  ║         without type check      ║
            //  ║                                 ║
            //  ╚═════════════════════════════════╝
            "@typescript-eslint/ban-tslint-comment": "error",
            "@typescript-eslint/class-literal-property-style": "error",
            "@typescript-eslint/consistent-generic-constructors": "error",
            "@typescript-eslint/consistent-indexed-object-style": "error",
            "@typescript-eslint/consistent-type-assertions": "error",
            "@typescript-eslint/consistent-type-definitions": "off",
            "@typescript-eslint/no-confusing-non-null-assertion": "error",
            "@typescript-eslint/no-duplicate-enum-values": "error",
            "@typescript-eslint/no-dynamic-delete": "error",
            "@typescript-eslint/no-extraneous-class": "error",
            "@typescript-eslint/no-invalid-void-type": "error",
            "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
            "@typescript-eslint/no-useless-constructor": "error",
            "@typescript-eslint/prefer-for-of": "error",
            "@typescript-eslint/prefer-function-type": "error",
            "@typescript-eslint/prefer-literal-enum-member": "error",
            "@typescript-eslint/prefer-optional-chain": "error",
            "@typescript-eslint/prefer-ts-expect-error": "error",
            "@typescript-eslint/unified-signatures": "error",
            //  ╔═════════════════════════════════╗
            //  ║                                 ║
            //  ║      Tests and Test runner      ║
            //  ║                                 ║
            //  ╚═════════════════════════════════╝
            "eslint-plugin-no-only-tests/no-only-tests": "error",
        },
    }
]);

export = config;