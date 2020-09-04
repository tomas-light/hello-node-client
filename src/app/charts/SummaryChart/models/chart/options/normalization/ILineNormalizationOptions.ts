import { IChartPoint } from '../../IChartPoint';

export interface ILineNormalizationOptions<TPoint extends IChartPoint> {
    getStartPoint: (point: TPoint) => TPoint;
    getEndPoint: (lastEndPoint: TPoint, point: TPoint) => TPoint;
}
