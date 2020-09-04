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

    /*
     2 attempts because at first time you compare FIRST line with everyone
     and at the end of loop it will contains entire period (and other lines will little correct with it)
     in second attempt you normalize all OTHER lines with full period from FIRST line
     for example, you have:
         [
            [ {'Mar', ...}, {'Apr', ...} ],
            [ {'Jan', ...}, {'Feb', ...} ],
            [ {'Jun', ...} ],
         ]

     after first attempt you will get:
         [
            [ {'Jan', ...}, {'Feb', ...}, {'Mar', ...}, {'Apr', ...}, {'May', ...}, {'Jun', ...} ],
            [ {'Jan', ...}, {'Feb', ...}, {'Mar', ...}, {'Apr', ...} ],
            [ {'Jan', ...}, {'Feb', ...}, {'Mar', ...}, {'Apr', ...}, {'May', ...}, {'Jun', ...} ],
         ]

     as you can see SECOND line does not contain full period, next attempt will fill the empty period
     */

    /*
    How it works? For example, you have:
        [
            [ {'Mar', ...}, {'Apr', ...} ],
            [ {'Jan', ...}, {'Feb', ...} ],
            [ {'Jun', ...} ],
        ]

    At first, we compare FIRST and SECOND lines. We get FIRST points of each line.
        {'Mar', ...} and {'Jan', ...}

    'Mar' is later than 'Jan', so we should to extends LEFT line's start from 'Jan' to 'Mar'.
    And we will get follow lines:
        [ {'Jan', ...}, {'Feb', ...}, {'Mar', ...}, {'Apr', ...} ],
        [ {'Jan', ...}, {'Feb', ...} ],

    After that we compare LAST points of each line
        {'Apr', ...} and {'Feb', ...}

    'Apr' is later than 'Feb', so we should to extends RIGHT line's end from 'Feb' to 'Apr'.
    And we will get follow lines:
        [ {'Jan', ...}, {'Feb', ...}, {'Mar', ...}, {'Apr', ...} ],
        [ {'Jan', ...}, {'Feb', ...}, {'Mar', ...}, {'Apr', ...} ],


    In next iteration we compare FIRST and THIRD lines.
        [ {'Jan', ...}, {'Feb', ...}, {'Mar', ...}, {'Apr', ...} ],
        and
        [ {'Jun', ...} ],

    We get FIRST points of each line.
        {'Jan', ...} and {'Jun', ...}

    'Jan' is earlier than 'Jun', so we should to extends RIGHT line's start from 'Jan' to 'Jun'.
    And we will get follow lines:
        [ {'Jan', ...}, {'Feb', ...}, {'Mar', ...}, {'Apr', ...} ],
        [ {'Jan', ...}, {'Feb', ...}, {'Mar', ...}, {'Apr', ...}, {'May', ...}, {'Jun', ...} ],

    After that we compare LAST points of each line
        {'Apr', ...} and {'Jun', ...}

    'Apr' is earlier than 'Jun', so we should to extends LEFT line's end from 'Apr' to 'Jun'.
    And we will get follow lines:
        [ {'Jan', ...}, {'Feb', ...}, {'Mar', ...}, {'Apr', ...}, {'May', ...}, {'Jun', ...} ],
        [ {'Jan', ...}, {'Feb', ...}, {'Mar', ...}, {'Apr', ...}, {'May', ...}, {'Jun', ...} ],
    */

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