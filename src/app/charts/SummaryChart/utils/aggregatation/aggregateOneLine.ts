import { INewStudiesDto, ISummaryChartPoint } from '../../models';
import { compareModelsByDate } from '../compareModelsByDate';
import { groupModelsByMonth } from '../groupModelsByMonth';

function aggregateOneLine(models: INewStudiesDto[]): ISummaryChartPoint[] {
    const sortedModels = models.sort(compareModelsByDate);
    const groupedDataByMonth = groupModelsByMonth(sortedModels);

    const summaryChartPoints: ISummaryChartPoint[] = [];
    let summaryAmount = 0;

    for (const [ monthName, entityNames ] of groupedDataByMonth.entries()) {
        summaryAmount += entityNames.length;
        const chartPoint: ISummaryChartPoint = {
            monthName,
            entityAmount: summaryAmount,
            newEntityNames: entityNames,
        };
        summaryChartPoints.push(chartPoint);
    }

    return summaryChartPoints;
}

export { aggregateOneLine };
