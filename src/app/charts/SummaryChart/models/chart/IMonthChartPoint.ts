import { IChartPoint } from './IChartPoint';

export interface IMonthChartPoint extends IChartPoint {
    year: number;
    monthName: string;
}
