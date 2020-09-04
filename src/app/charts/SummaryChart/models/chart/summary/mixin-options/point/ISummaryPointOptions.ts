import { INewStudiesDto } from '../../../../INewStudiesDto';
import { IPointOptions } from '../../../options/point';
import { ISummaryChartPoint } from '../../ISummaryChartPoint';

export interface ISummaryPointOptions extends IPointOptions<INewStudiesDto, ISummaryChartPoint> {
}
