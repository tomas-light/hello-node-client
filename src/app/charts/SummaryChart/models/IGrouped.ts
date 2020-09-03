export interface IGrouped<TEntity> {
    entities: TEntity[];
    [key: string]: any;
}
