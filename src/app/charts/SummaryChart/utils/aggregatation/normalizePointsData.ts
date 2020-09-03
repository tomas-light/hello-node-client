import { calcMonthDifference } from '@utils/date-time/calcMonthDifference';
import { MONTH_INDEXES } from '@utils/date-time/constants';
import { getMonthByName, getMonthName } from '@utils/date-time/getMonthName';
import { ISummaryChartPoint } from '../../models';

function normalizePointsData(chartPoints: ISummaryChartPoint[][]): ISummaryChartPoint[][] {
    if (!chartPoints || !Array.isArray(chartPoints) || !chartPoints.length) {
        return [];
    }

    const normalizedPoints = [ ...chartPoints ];
    const firstLine = chartPoints[0];

    for (let attempt = 0; attempt < 2; attempt++) {
        for (let lineIndex = 1; lineIndex < chartPoints.length; lineIndex++) {
            const rightLine = chartPoints[lineIndex];
            normalizeStartPoints(firstLine, rightLine);
            normalizeEndPoints(firstLine, rightLine);
        }
    }

    return normalizedPoints;
}

function normalizeStartPoints(leftLine: ISummaryChartPoint[], rightLine: ISummaryChartPoint[]) {
    const leftFirstPoint = leftLine[0];
    const rightFirstPoint = rightLine[0];

    if (leftFirstPoint.monthName === rightFirstPoint.monthName) {
        return;
    }

    const leftMonth = getMonthByName(leftFirstPoint.monthName);
    const rightMonth = getMonthByName(rightFirstPoint.monthName);

    const diff: number = calcMonthDifference(
        leftFirstPoint.year,
        leftMonth,
        rightFirstPoint.year,
        rightMonth
    );

    let month: number = leftMonth;
    let year: number = leftFirstPoint.year;
    let line: ISummaryChartPoint[] = rightLine;

    if (diff < 0) {
        month = rightMonth;
        year = rightFirstPoint.year;
        line = leftLine;
    }

    for (let i = 0; i < Math.abs(diff); i++, month++) {
        if (month > MONTH_INDEXES.December) {
            month = MONTH_INDEXES.January;
            year++;
        }

        const monthName = getMonthName(month, 3);

        line.splice(i, 0, {
            year,
            monthName,
            newEntityNames: [],
            entityAmount: 0,
        });
    }
}

function normalizeEndPoints(leftLine: ISummaryChartPoint[], rightLine: ISummaryChartPoint[]) {
    const leftEndPoint = leftLine[leftLine.length - 1];
    const rightEndPoint = rightLine[rightLine.length - 1];

    if (leftEndPoint.monthName === rightEndPoint.monthName) {
        return;
    }

    const leftMonth = getMonthByName(leftEndPoint.monthName);
    const rightMonth = getMonthByName(rightEndPoint.monthName);

    const diff: number = calcMonthDifference(
        rightEndPoint.year,
        rightMonth,
        leftEndPoint.year,
        leftMonth
    );

    let month: number = leftMonth + 1;
    let year: number = leftEndPoint.year;
    let line: ISummaryChartPoint[] = leftLine;

    if (diff > 0) {
        month = rightMonth + 1;
        year = rightEndPoint.year;
        line = rightLine;
    }

    const entityAmount: number = line[line.length - 1].entityAmount;

    for (let i = 0; i < Math.abs(diff); i++, month++) {
        if (month > MONTH_INDEXES.December) {
            month = MONTH_INDEXES.January;
            year++;
        }

        const monthName = getMonthName(month, 3);

        line.push({
            year,
            monthName,
            newEntityNames: [],
            entityAmount,
        });
    }
}

export { normalizePointsData };
