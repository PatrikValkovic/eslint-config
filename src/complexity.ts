import typescriptParser from '@typescript-eslint/parser';
import { deepMerge } from '@typescript-eslint/utils/eslint-utils';
import { Config, ConfigOrTsPath } from './types';

const config = (config: ConfigOrTsPath, overrides?: Config) => {
    const configToUse = deepMerge(
        typeof config === 'string' ? {
            settings: {
                'eslint-plugin-import/resolver': {
                    typescript: {
                        project: [config],
                    },
                },
            },
            languageOptions: {
                parser: typescriptParser,
                parserOptions: {
                    project: config,
                },
            },
        } : config,
        overrides,
    );

    return ([
        {
            ...configToUse,
            name: '@patrikvalkovic/eslint-config/complexity',
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
};

export = config;
