import { combineReducers } from 'redux';

import Tasks from './tasksReducers';
import Modal from './modalReducers';

const reducers = combineReducers({
  tasks: Tasks,
  modal: Modal,
});

export default reducers;
