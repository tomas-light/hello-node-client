import { ICompositionOptions } from './options/composition';
import { INormalizationOptions } from './options/normalization';
import { IPayloadOptions } from './options/payload';
import { IPointOptions } from './options/point';
import { IChartPayload } from './IChartPayload';
import { IChartPoint } from './IChartPoint';

interface IChartOptions<
    TEntity,
    TPoint extends IChartPoint,
    TChartData,
    TPayload extends IChartPayload
> extends
    ICompositionOptions<TEntity>,
    IPayloadOptions<TPoint, TChartData, TPayload>,
    IPointOptions<TEntity, TPoint>,
    INormalizationOptions<TPoint> {
}

export { IChartOptions };
