import { IChartPoint } from '../../IChartPoint';
import { IGroupedByMonth } from '../../../IGroupedByMonth';

export interface IPointOptions<TEntity, TPoint extends IChartPoint> {
    initAccumulator?: any;
    /** @returns {any} accumulator value */
    addChartPoint: (
        points: TPoint[],
        grouped: IGroupedByMonth<TEntity>,
        accumulator?: any
    ) => any;
}
