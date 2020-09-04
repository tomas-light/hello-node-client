import { compareModelsByDate } from '../../../../../utils/compareModelsByDate';
import { groupModelsByMonth } from '../../../../../utils/groupModelsByMonth';
import { IGroupedByMonth } from '../../../../IGroupedByMonth';
import { INewStudiesDto } from '../../../../INewStudiesDto';
import { ISummaryCompositionOptions } from './ISummaryCompositionOptions';

export class SummaryCompositionOptions implements ISummaryCompositionOptions {
    sort: (left: INewStudiesDto, right: INewStudiesDto) => number;
    group: (entities: INewStudiesDto[]) => IGroupedByMonth<INewStudiesDto>[];

    constructor() {
        this.sort = compareModelsByDate;
        this.group = groupModelsByMonth;
    }
}
