import { IAggregated } from '../../models';
import { IChartData } from '../../models/chart/IChartData';
import { IChartOptions } from '../../models/chart/IChartOptions';
import { IMonthChartPoint } from '../../models/chart/IMonthChartPoint';
import { aggregateOneLine } from './aggregateOneLine';
import { normalizePointsData } from './normalizePointsData';

function aggregateMultipleLine<TEntity, TPoint extends IMonthChartPoint, TChartData extends IChartData, TPayload>(
    data: IAggregated<TEntity>,
    options: IChartOptions<TEntity, TPoint, TChartData, TPayload>
): TChartData[] {
    const keys = Object.keys(data);

    const chartPoints: TPoint[][] = [];
    keys.forEach(key => {
        const points = aggregateOneLine<TEntity, TPoint, TChartData, TPayload>(data[key], options);
        chartPoints.push(points);
    });

    const normalizedPoints = normalizePointsData<TPoint>(chartPoints, options.lineNormalizationOptions);
    const chartLines: TChartData[] = [];

    for (let pointIndex = 0; pointIndex < normalizedPoints[0].length; pointIndex++) {
        const firstPoint = normalizedPoints[0][pointIndex];
        const chartData = {
            axiosX: firstPoint.monthName,
            payload: options.addCommonPayload(firstPoint),
        } as TChartData;

        for (let lineIndex = 0; lineIndex < keys.length; lineIndex++) {
            const axiosYName = keys[lineIndex];
            const point = normalizedPoints[lineIndex][pointIndex];
            options.adjustCommonPayload(chartData, axiosYName, point);
        }

        chartLines.push(chartData);
    }

    return chartLines;
}

export { aggregateMultipleLine };

