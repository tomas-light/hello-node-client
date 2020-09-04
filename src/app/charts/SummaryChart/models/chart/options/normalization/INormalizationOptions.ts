import { IChartPoint } from '../../IChartPoint';
import { ILineNormalizationOptions } from './ILineNormalizationOptions';

export interface INormalizationOptions<TPoint extends IChartPoint> {
    lineNormalizationOptions: ILineNormalizationOptions<TPoint>;
}
