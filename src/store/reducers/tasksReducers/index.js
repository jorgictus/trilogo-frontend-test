const taskConstants = {
  ADD_TASKS: 'ADD_TASKS',
  MOVE_TASK: 'MOVE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  EDIT_TASK: 'EDIT_TASK',
};

import { getTask } from '../../../services';

const INITIAL_STATE = getTask() || [];

export default function tasks(state = INITIAL_STATE, action) {
  switch (action.type) {
    case taskConstants.ADD_TASKS:
      return [...state, action.object];

    case taskConstants.MOVE_TASK:
      return state;

    case taskConstants.DELETE_TASK:
      var newState = state;
      newState.splice(
        newState.findIndex((obj) => obj.id == action.id),
        1
      );
      return [...newState];

    case taskConstants.EDIT_TASK:
      var editableState = state;
      var objectIndex = editableState.findIndex(
        (obj) => obj.id == action.object.id
      );
      editableState[objectIndex] = action.object;
      return [...editableState];

    default:
      return state;
  }
}
