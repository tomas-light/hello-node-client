import { IGrouped } from './IGrouped';

export interface IGroupedByMonth<TEntity> extends IGrouped<TEntity> {
    year: number;
    month: number;
}
