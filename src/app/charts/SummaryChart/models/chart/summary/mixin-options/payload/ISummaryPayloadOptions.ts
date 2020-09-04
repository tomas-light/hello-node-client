import { IPayloadOptions } from '../../../options/payload';
import { ISummaryChartData } from '../../ISummaryChartData';
import { ISummaryChartPayload } from '../../ISummaryChartPayload';
import { ISummaryChartPoint } from '../../ISummaryChartPoint';

export interface ISummaryPayloadOptions
    extends IPayloadOptions<ISummaryChartPoint, ISummaryChartData, ISummaryChartPayload> {
}
