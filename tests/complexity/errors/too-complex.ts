// Triggers max-statements (default max: 10)
function tooManyStatements(): void {
    const aa = 1;
    const bb = 2;
    const cc = 3;
    const dd = 4;
    const ee = 5;
    const ff = 6;
    const gg = 7;
    const hh = 8;
    const ii = 9;
    const jj = 10;
    const kk = 11;
    void aa; void bb; void cc; void dd; void ee;
    void ff; void gg; void hh; void ii; void jj; void kk;
}

export { tooManyStatements };
