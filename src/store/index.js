import { createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

import reducers from './reducers';
import { addTask } from '../services';

const store = createStore(reducers);

store.subscribe(() => {
  addTask(store.getState().tasks);
});

const makeStore = () => {
  return store;
};

export const storeWrapper = createWrapper(makeStore, { debug: false });
