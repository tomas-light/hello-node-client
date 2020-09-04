import { ISummaryChartData } from '../../ISummaryChartData';
import { ISummaryChartPayload } from '../../ISummaryChartPayload';
import { ISummaryChartPoint } from '../../ISummaryChartPoint';
import { ISummaryPayloadOptions } from './ISummaryPayloadOptions';

export class SummaryPayloadOptions implements ISummaryPayloadOptions {
    addCommonPayload: (point: ISummaryChartPoint) => Partial<ISummaryChartPayload>;
    adjustCommonPayload: (chartData: ISummaryChartData, axiosYName: string, point: ISummaryChartPoint) => void;

    constructor() {
        this.addCommonPayload = (point: ISummaryChartPoint) => ({ year: point.year });
        this.adjustCommonPayload = (chartData: ISummaryChartData, axiosYName: string, point: ISummaryChartPoint) => {
            chartData[axiosYName] = point.entityAmount;
            if (!chartData.payload) {
                chartData.payload = {};
            }
            chartData.payload[axiosYName] = point.newEntityNames;
        };
    }
}
