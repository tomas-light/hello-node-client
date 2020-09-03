import { calcMonthDifference } from '@utils/date-time/calcMonthDifference';
import { getMonthName } from '@utils/date-time/getMonthName';
import { INewStudiesDto, ISummaryChartPoint } from '../../models';
import { IGroupedByMonth } from '../../models/IGroupedByMonth';
import { compareModelsByDate } from '../compareModelsByDate';
import { groupModelsByMonth } from '../groupModelsByMonth';
import { calcYearAndMonth } from './calcYearAndMonth';

// function aggregateOneLine(models: INewStudiesDto[]): ISummaryChartPoint[] {
//     const sortedModels = models.sort(compareModelsByDate);
//     const groupedDataByMonth = groupModelsByMonth(sortedModels);
//
//     const summaryChartPoints: ISummaryChartPoint[] = [];
//     let summaryAmount = 0;
//
//     for (const [ monthName, entityNames ] of groupedDataByMonth.entries()) {
//         summaryAmount += entityNames.length;
//         const chartPoint: ISummaryChartPoint = {
//             monthName,
//             entityAmount: summaryAmount,
//             newEntityNames: entityNames,
//         };
//         summaryChartPoints.push(chartPoint);
//     }
//
//     return summaryChartPoints;
// }
function aggregateOneLine(models: INewStudiesDto[]): ISummaryChartPoint[] {
    const sorted = models.sort(compareModelsByDate);
    const groupedData = groupModelsByMonth(sorted);

    const summaryChartPoints = aggregateGroupedData(groupedData);
    return summaryChartPoints;
}

export function aggregateGroupedData(groupedData: IGroupedByMonth<INewStudiesDto>[]) {
    let summaryAmount = 0;
    const summaryChartPoints: ISummaryChartPoint[] = [];

    groupedData.forEach((grouped, index) => {
        if (index > 0) {
            const previousGrouped = groupedData[index - 1];
            fillEmptyIntervals(summaryChartPoints, grouped, previousGrouped, summaryAmount);
        }

        summaryAmount = summaryAmount + grouped.entities.length;
        addChartPoint(summaryChartPoints, grouped, summaryAmount);
    });

    return summaryChartPoints;
}

function fillEmptyIntervals(
    summaryChartPoints: ISummaryChartPoint[],
    grouped: IGroupedByMonth<INewStudiesDto>,
    previousGrouped: IGroupedByMonth<INewStudiesDto>,
    summaryAmount: number
): void {
    const diff = calcMonthDifference(
        previousGrouped.year,
        previousGrouped.month,
        grouped.year,
        grouped.month
    );

    // if diff <= 1, then current month it is next after previous month or the same month
    // in this case we have no empty intervals
    const hasEmptyIntervalBetweenDates = diff > 1;
    if (!hasEmptyIntervalBetweenDates) {
        return;
    }

    for (let currentMonthDiff = diff - 1; currentMonthDiff > 0; currentMonthDiff--) {
        const [ year, month ] = calcYearAndMonth(grouped, currentMonthDiff);

        addChartPoint(
            summaryChartPoints,
            {
                month,
                entities: [],
                year,
            },
            summaryAmount
        );
    }
}

function addChartPoint(
    summaryChartPoints: ISummaryChartPoint[],
    grouped: IGroupedByMonth<INewStudiesDto>,
    entityAmount: number
): void {
    const monthName = getMonthName(grouped.month, 3);
    const newEntityNames = grouped.entities.map(entity => entity.name);

    summaryChartPoints.push({
        year: grouped.year,
        monthName,
        entityAmount,
        newEntityNames,
    });
}

export { aggregateOneLine };
