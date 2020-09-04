import { ISummaryChartData } from '../../models';
import { ISummaryChartPayload } from '../../models/chart/summary/ISummaryChartPayload';

type YLines = {
    [key: string]: number;
};
type YLines2 = {
    [key: string]: string[];
};

function pushToSummaryChartData(
    array: ISummaryChartData[],
    year: number,
    axiosX: string,
    yLineNewPoints: YLines2 = {}
): void {
    const payload = {};
    const yLines: YLines = {};

    if (array.length === 0) {
        Object.keys(yLineNewPoints).forEach(key => {
            yLines[key] = yLineNewPoints[key].length;
            payload[key] = yLineNewPoints[key];
        });
    }
    else {
        const prev = array[array.length - 1];
        Object.keys(prev)
            .filter(key =>
                key !== nameof<ISummaryChartData>(o => o.axiosX) &&
                key !== nameof<ISummaryChartData>(o => o.payload)
            )
            .forEach(key => {
                yLines[key] = prev[key];
            });

        Object.keys(prev.payload)
            .filter(key => key !== nameof<ISummaryChartPayload>(o => o.year))
            .forEach(key => {
                if (yLineNewPoints[key]) {
                    yLines[key] += yLineNewPoints[key].length;
                    payload[key] = yLineNewPoints[key];
                }
                else {
                    payload[key] = [];
                }
            });
    }

    array.push({
        axiosX,
        ...yLines,
        payload: {
            year,
            ...payload,
        },
    });
}

export { pushToSummaryChartData };
