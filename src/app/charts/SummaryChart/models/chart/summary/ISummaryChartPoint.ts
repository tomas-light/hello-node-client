import { IMonthChartPoint } from '../IMonthChartPoint';

export interface ISummaryChartPoint extends IMonthChartPoint {
    entityAmount: number;
    newEntityNames: string[];
}
