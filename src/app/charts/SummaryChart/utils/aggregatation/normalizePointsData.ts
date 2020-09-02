import { getMonthByName } from '@utils/date-time/getMonthName';
import { ISummaryChartPoint } from '../../models';

interface ICursor {
    pointIndex: number;
    lineIndex: number;
}

function normalizePointsData(chartPoints: ISummaryChartPoint[][]): ISummaryChartPoint[][] {
    const normalizedPoints = [ ...chartPoints ];

    const cursor: ICursor = {
        pointIndex: 0,
        lineIndex: 0,
    };

    do {
        normalizePoint(normalizedPoints, cursor);
        if (++cursor.pointIndex >= normalizedPoints[cursor.lineIndex].length) {
            cursor.lineIndex++;
            cursor.pointIndex = 0;
        }
    }
    while (cursor.lineIndex < normalizedPoints.length);

    return normalizedPoints;
}

function normalizePoint(points: ISummaryChartPoint[][], cursor: ICursor) {
    const currentPoint = points[cursor.lineIndex][cursor.pointIndex];

    for (let lineIndex = cursor.lineIndex + 1; lineIndex < points.length; lineIndex++) {
        const line = points[lineIndex];
        let otherPoint = line[cursor.pointIndex];

        if (!otherPoint) {
            otherPoint = line[cursor.pointIndex - 1];
            line.push({
                monthName: currentPoint.monthName,
                entityAmount: otherPoint.entityAmount,
                newEntityNames: [],
            });
            continue;
        }

        if (currentPoint.monthName !== otherPoint.monthName) {
            const currentMonth = getMonthByName(currentPoint.monthName);
            const otherMonth = getMonthByName(otherPoint.monthName);

            if (currentMonth < otherMonth) {
                addMissedPointToLine(
                    points,
                    cursor,
                    line,
                    currentPoint.monthName
                );
            }
            else {
                addMissedPointToLine(
                    points,
                    cursor,
                    points[cursor.lineIndex],
                    otherPoint.monthName
                );
            }
        }
    }
}

function addMissedPointToLine(
    points: ISummaryChartPoint[][],
    cursor: ICursor,
    line: ISummaryChartPoint[],
    monthName: string
) {
    const previousPointIndex = cursor.pointIndex - 1;
    let entityAmount: number;
    if (previousPointIndex < 0) {
        entityAmount = 0;
    }
    else {
        entityAmount = line[previousPointIndex].entityAmount;
    }

    line.splice(cursor.pointIndex, 0, {
        monthName,
        entityAmount,
        newEntityNames: [],
    });
}

export { normalizePointsData };
