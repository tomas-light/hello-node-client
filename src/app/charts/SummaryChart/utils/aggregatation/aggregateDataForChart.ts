import { IAggregated, ISummaryChartData } from '../../models';
import { IChartData } from '../../models/chart/IChartData';
import { IChartOptions } from '../../models/chart/IChartOptions';
import { IMonthChartPoint } from '../../models/chart/IMonthChartPoint';
import { aggregateMultipleLine } from './aggregateMultipleLine';
import { aggregateOneLine } from './aggregateOneLine';

function aggregateDataForChart<TEntity, TPoint extends IMonthChartPoint, TChartData extends IChartData, TPayload>(
    data: IAggregated<TEntity>,
    options: IChartOptions<TEntity, TPoint, TChartData, TPayload>
): ISummaryChartData[] {
    const keys = Object.keys(data);
    if (keys.length === 0) {
        return [];
    }

    if (keys.length === 1) {
        const key = keys[0];
        const chartPoint = aggregateOneLine<TEntity, TPoint, TChartData, TPayload>(data[key], options);
        const chartData: ISummaryChartData[] = chartPoint.map(point => ({
            axiosX: point.monthName,
            [key]: options.addCommonPayload(point),
        }));
        return chartData;
    }

    return aggregateMultipleLine<TEntity, TPoint, TChartData, TPayload>(data, options);
}

export { aggregateDataForChart };
