import { IChartPayload } from '../../IChartPayload';
import { IChartPoint } from '../../IChartPoint';

export interface IPayloadOptions<TPoint extends IChartPoint, TChartData, TPayload extends IChartPayload> {
    addCommonPayload: (point: TPoint) => Partial<TPayload>;
    adjustCommonPayload: (chartData: TChartData, axiosYName: string, point: TPoint) => void;
}
