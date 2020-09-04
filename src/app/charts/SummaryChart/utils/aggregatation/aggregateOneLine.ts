import { calcMonthDifference } from '@utils/date-time/calcMonthDifference';
import { IChartOptions } from '../../models/chart/IChartOptions';
import { IGroupedByMonth } from '../../models/IGroupedByMonth';
import { calcYearAndMonth } from './calcYearAndMonth';

function aggregateOneLine<TEntity, TPoint, TChartData, TPayload>(
    models: TEntity[],
    options: IChartOptions<TEntity, TPoint, TChartData, TPayload>
): TPoint[] {
    const sorted = models.sort(options.sort);
    const groupedData = options.group(sorted);

    const summaryChartPoints = aggregateGroupedData<TEntity, TPoint, TChartData, TPayload>(groupedData, options);
    return summaryChartPoints;
}

export function aggregateGroupedData<TEntity, TPoint, TChartData, TPayload>(
    groupedData: IGroupedByMonth<TEntity>[],
    options: IChartOptions<TEntity, TPoint, TChartData, TPayload>
): TPoint[] {
    let accumulator = options.initAccumulator;
    const points: TPoint[] = [];

    groupedData.forEach((grouped, index) => {
        if (index > 0) {
            const previousGrouped = groupedData[index - 1];
            fillEmptyIntervals(points, grouped, previousGrouped, options, accumulator);
        }

        accumulator = options.addChartPoint(
            points,
            grouped,
            accumulator
        );
    });

    return points;
}

function fillEmptyIntervals<TEntity, TPoint, TChartData, TPayload>(
    points: TPoint[],
    grouped: IGroupedByMonth<TEntity>,
    previousGrouped: IGroupedByMonth<TEntity>,
    options: IChartOptions<TEntity, TPoint, TChartData, TPayload>,
    accumulator: number
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
        const [ year, month ] = calcYearAndMonth<TEntity>(grouped, currentMonthDiff);
        options.addChartPoint(
            points,
            {
                year,
                month,
                entities: [],
            },
            accumulator
        );
    }
}

export { aggregateOneLine };
