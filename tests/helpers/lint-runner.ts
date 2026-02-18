import { describe, it, expect } from 'vitest';
import { ESLint } from 'eslint';
import * as fs from 'fs';
import * as path from 'path';

const eslintCache = new Map<string, ESLint>();

function createEslintForSuite(suiteDir: string): ESLint {
    if (!eslintCache.has(suiteDir)) {
        eslintCache.set(suiteDir, new ESLint({ cwd: suiteDir }));
    }
    return eslintCache.get(suiteDir)!;
}

function parseExpectedErrors(filePath: string): string[] {
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/^\/\/\s*@expect-errors:\s*(.+)/m);
    if (match) {
        return match[1].split(',').map(s => s.trim());
    }
    const basename = path.basename(filePath);
    const nameWithoutExt = basename.replace(/\.[^.]+$/, '');
    return [nameWithoutExt];
}

function ruleMatchesExpected(ruleId: string | null, expected: string): boolean {
    if (!ruleId) return false;
    return (
        ruleId === expected ||
        ruleId === `@typescript-eslint/${expected}` ||
        ruleId === `@stylistic/${expected}`
    );
}

export function runSuite(suiteDir: string): void {
    const suiteName = path.basename(suiteDir);

    describe(suiteName, () => {
        const validDir = path.join(suiteDir, 'valid');
        if (fs.existsSync(validDir)) {
            describe('valid', () => {
                const files = fs.readdirSync(validDir).filter(f => !f.startsWith('.'));
                for (const file of files) {
                    const filePath = path.join(validDir, file);
                    it(`${file} has no errors`, async () => {
                        const eslint = createEslintForSuite(suiteDir);
                        const results = await eslint.lintFiles([filePath]);
                        const messages = results.flatMap(r => r.messages);
                        const errorCount = results.reduce((sum, r) => sum + r.errorCount, 0);
                        expect(
                            errorCount,
                            `Unexpected errors:\n${messages.filter(m => m.severity === 2).map(m => `  [${m.ruleId}] ${m.message}`).join('\n')}`,
                        ).toBe(0);
                    });
                }
            });
        }

        const errorsDir = path.join(suiteDir, 'errors');
        if (fs.existsSync(errorsDir)) {
            describe('errors', () => {
                const files = fs.readdirSync(errorsDir).filter(f => !f.startsWith('.'));
                for (const file of files) {
                    const filePath = path.join(errorsDir, file);
                    it(`${file} has expected violations`, async () => {
                        const eslint = createEslintForSuite(suiteDir);
                        const results = await eslint.lintFiles([filePath]);
                        const result = results[0];
                        const totalViolations = (result?.errorCount ?? 0) + (result?.warningCount ?? 0);
                        expect(totalViolations).toBeGreaterThan(0);

                        const expectedRules = parseExpectedErrors(filePath);
                        const ruleIds = (result?.messages ?? []).map(m => m.ruleId);
                        const anyRuleMatched = expectedRules.some(expected =>
                            ruleIds.some(id => ruleMatchesExpected(id, expected)),
                        );

                        if (anyRuleMatched) {
                            for (const expected of expectedRules) {
                                const matched = ruleIds.some(id => ruleMatchesExpected(id, expected));
                                expect(
                                    matched,
                                    `Expected rule "${expected}" to fire. Got rules: ${ruleIds.filter(Boolean).join(', ')}`,
                                ).toBe(true);
                            }
                        }
                    });
                }
            });
        }

        const fixableDir = path.join(suiteDir, 'fixable');
        if (fs.existsSync(fixableDir)) {
            describe('fixable', () => {
                const inputFiles = fs.readdirSync(fixableDir)
                    .filter(f => f.includes('.input.') && !f.startsWith('.'));
                for (const inputFile of inputFiles) {
                    const expectedFile = inputFile.replace('.input.', '.expected.');
                    const inputPath = path.join(fixableDir, inputFile);
                    const expectedPath = path.join(fixableDir, expectedFile);
                    it(`${inputFile} auto-fixes to ${expectedFile}`, async () => {
                        const eslint = new ESLint({ cwd: suiteDir, fix: true });
                        const inputContent = fs.readFileSync(inputPath, 'utf-8');
                        const expectedContent = fs.readFileSync(expectedPath, 'utf-8');
                        const results = await eslint.lintText(inputContent, { filePath: inputPath });
                        const output = results[0]?.output ?? inputContent;
                        expect(output).toBe(expectedContent);
                    });
                }
            });
        }
    });
}
