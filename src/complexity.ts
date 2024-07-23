// @ts-expect-error typing is missing
import typescriptParser from '@typescript-eslint/parser';

const _config = (tsFilePath: string) => ([
    {
        name: '@patrikvalkovic/eslint-config/complexity',
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: tsFilePath,
            },
        },
        rules: {
            //  ╔═══════════════════════╗
            //  ║                       ║
            //  ║      Suggestions      ║
            //  ║                       ║
            //  ╚═══════════════════════╝
            'complexity': 'warn',
            'id-denylist': 'warn',
            'id-length': 'warn',
            'max-classes-per-file': 'warn',
            'max-depth': 'warn',
            'max-lines': 'warn',
            'max-lines-per-function': 'warn',
            'max-nested-callbacks': 'warn',
            'max-params': 'warn',
            'max-statements': 'warn',
        },
    },
]);
