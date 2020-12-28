export function logicMiddleware(watchers) {
  return (reduxStore) => (next) => action => {
    next(action);

    if (watchers.has(action.type)) {
      const handler = watchers.get(action.type);
      handler(reduxStore.dispatch, action);
    }
  };
}
