import typescriptParser from '@typescript-eslint/parser';
import { ConfigOrTsPath } from './types';

const config = (config: ConfigOrTsPath) => ([
    {
        name: '@patrikvalkovic/eslint-config/complexity',
        ...(!config ? {} : typeof config === 'string' ? {
            languageOptions: {
                parser: typescriptParser,
                parserOptions: {
                    project: config,
                },
            },
        } : config),
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

export = config;
