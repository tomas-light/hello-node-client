function calcMonthDifference(year1: number, month1: number, year2: number, month2: number): number {
    const yearMonthDiff = (year2 - year1) * 12;
    const months = yearMonthDiff - month1 + month2;
    return months;
}

export { calcMonthDifference };
