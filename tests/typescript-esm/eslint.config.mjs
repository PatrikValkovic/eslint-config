import typescript from '@patrikvalkovic/eslint-config/typescript';
import path from 'path';

export default [
    ...typescript(path.join(import.meta.dirname, 'tsconfig.json'))
];
