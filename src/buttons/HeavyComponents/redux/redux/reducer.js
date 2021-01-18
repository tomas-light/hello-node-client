import { Store } from './store';
import { Actions } from './actions';

let i = 1;

export function reducer(store = new Store(), action) {
  if (action.type === Actions.LOAD_MY_DATA) {
    console.log('load my data');
    return {
      myData: i++,
    };
  }

  return store;
}
