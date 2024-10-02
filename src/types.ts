import { TSESLint } from '@typescript-eslint/utils';

export type ConfigOrTsPath = Pick<TSESLint.FlatConfig.Config, 'settings' | 'languageOptions'|'linterOptions'> | string;
