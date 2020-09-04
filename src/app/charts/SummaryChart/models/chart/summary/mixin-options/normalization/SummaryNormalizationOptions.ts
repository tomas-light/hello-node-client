import { ILineNormalizationOptions } from '../../../options/normalization';
import { ISummaryChartPoint } from '../../ISummaryChartPoint';
import { ISummaryNormalizationOptions } from './ISummaryNormalizationOptions';

export class SummaryNormalizationOptions implements ISummaryNormalizationOptions {
    lineNormalizationOptions: ILineNormalizationOptions<ISummaryChartPoint>;

    constructor() {
        this.lineNormalizationOptions = {
            getStartPoint: (point: ISummaryChartPoint) => ({
                year: point.year,
                monthName: point.monthName,
                newEntityNames: [],
                entityAmount: 0,
            }),
            getEndPoint: (lastEndPoint: ISummaryChartPoint, point: ISummaryChartPoint) => ({
                year: point.year,
                monthName: point.monthName,
                newEntityNames: [],
                entityAmount: lastEndPoint.entityAmount,
            }),
        };
    }
}
