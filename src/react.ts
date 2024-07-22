// @ts-expect-error typing is missing
import typescriptParser from '@typescript-eslint/parser';

const config = (tsFilePath: string) => ([
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
            'no-array': 'warn',
        },
    },
]);
