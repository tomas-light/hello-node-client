import { ISummaryCompositionOptions } from './mixin-options/composition';
import { ISummaryNormalizationOptions } from './mixin-options/normalization';
import { ISummaryPayloadOptions } from './mixin-options/payload';
import { ISummaryPointOptions } from './mixin-options/point';

export interface ISummaryChartOptions
    extends ISummaryCompositionOptions,
        ISummaryNormalizationOptions,
        ISummaryPayloadOptions,
        ISummaryPointOptions {
}
