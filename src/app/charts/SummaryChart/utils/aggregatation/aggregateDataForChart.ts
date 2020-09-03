import { IAggregated, INewStudiesDto, ISummaryChartData } from '../../models';
import { aggregateMultipleLine } from './aggregateMultipleLine';
import { aggregateOneLine } from './aggregateOneLine';

function aggregateDataForChart(data: IAggregated<INewStudiesDto>): ISummaryChartData[] {
    const keys = Object.keys(data);
    if (keys.length === 0) {
        return [];
    }

    if (keys.length === 1) {
        const key = keys[0];
        const chartPoint = aggregateOneLine(data[key]);
        const chartData: ISummaryChartData[] = chartPoint.map(point => ({
            axiosX: point.monthName,
            [key]: point.entityAmount,
        }));
        return chartData;
    }

    return aggregateMultipleLine(data);
}

export { aggregateDataForChart };
