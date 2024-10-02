import { TSESLint } from '@typescript-eslint/utils';

export type Config = Pick<TSESLint.FlatConfig.Config, 'settings' | 'languageOptions'|'linterOptions'>;

export type ConfigOrTsPath = Config | string;
