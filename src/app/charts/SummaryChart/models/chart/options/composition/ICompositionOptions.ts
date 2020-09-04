import { IGroupedByMonth } from '../../../IGroupedByMonth';

export interface ICompositionOptions<TEntity> {
    sort: (left: TEntity, right: TEntity) => number;
    group: (entities: TEntity[]) => IGroupedByMonth<TEntity>[];
}
