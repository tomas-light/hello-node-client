import { IAggregated, INewStudiesDto, ISummaryChartData, ISummaryChartPoint } from '../../models';
import { aggregateOneLine } from './aggregateOneLine';
import { normalizePointsData } from './normalizePointsData';

function aggregateMultipleLine(data: IAggregated<INewStudiesDto>): ISummaryChartData[] {
    const keys = Object.keys(data);

    const chartPoints: ISummaryChartPoint[][] = [];
    keys.forEach(key => {
        const points = aggregateOneLine(data[key]);
        chartPoints.push(points);
    });

    const normalizedPoints = normalizePointsData(chartPoints);
    const chartLines: ISummaryChartData[] = [];

    for (let pointIndex = 0; pointIndex < normalizedPoints[0].length; pointIndex++) {
        const monthName = normalizedPoints[0][pointIndex].monthName;
        const chartData: ISummaryChartData = {
            axiosX: monthName,
        };

        for (let lineIndex = 0; lineIndex < keys.length; lineIndex++) {
            const axiosYName = keys[lineIndex];
            const axiosYData = normalizedPoints[lineIndex][pointIndex].entityAmount;

            chartData[axiosYName] = axiosYData;
        }

        chartLines.push(chartData);
    }

    return chartLines;
}

export { aggregateMultipleLine };

