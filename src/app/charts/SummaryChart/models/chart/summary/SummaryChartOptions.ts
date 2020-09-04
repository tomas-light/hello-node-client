import { IGroupedByMonth } from '../../IGroupedByMonth';
import { INewStudiesDto } from '../../INewStudiesDto';
import { ILineNormalizationOptions } from '../options/normalization';
import { ISummaryChartData } from './ISummaryChartData';
import { ISummaryChartOptions } from './ISummaryChartOptions';
import { ISummaryChartPayload } from './ISummaryChartPayload';
import { ISummaryChartPoint } from './ISummaryChartPoint';

import { SummaryCompositionOptions as Composition } from './mixin-options/composition';
import { SummaryNormalizationOptions as Normalization } from './mixin-options/normalization';
import { SummaryPayloadOptions as Payload } from './mixin-options/payload';
import { SummaryPointOptions as Point } from './mixin-options/point';

class SummaryChartOptions implements ISummaryChartOptions {
    sort: (left: INewStudiesDto, right: INewStudiesDto) => number;
    group: (entities: INewStudiesDto[]) => IGroupedByMonth<INewStudiesDto>[];

    addCommonPayload: (point: ISummaryChartPoint) => Partial<ISummaryChartPayload>;
    adjustCommonPayload: (chartData: ISummaryChartData, axiosYName: string, point: ISummaryChartPoint) => void;

    initAccumulator?: any;
    addChartPoint: (
        points: ISummaryChartPoint[],
        grouped: IGroupedByMonth<INewStudiesDto>,
        accumulator?: any
    ) => any;

    lineNormalizationOptions: ILineNormalizationOptions<ISummaryChartPoint>;
}

function mixin(type) {
    Object.assign(SummaryChartOptions.prototype, type);
}
mixin(new Composition());
mixin(new Normalization());
mixin(new Payload());
mixin(new Point());

export { SummaryChartOptions };
