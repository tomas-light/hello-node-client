import { INewStudiesDto } from '../models';

function compareModelsByDate(left: INewStudiesDto, right: INewStudiesDto) {
    const leftMilliseconds = left.date.getMilliseconds();
    const rightMilliseconds = right.date.getMilliseconds();
    if (leftMilliseconds > rightMilliseconds) {
        return -1;
    }
    return 0;
}

export { compareModelsByDate };
