const modalConstants = {
  OPEN_MODAL: 'OPEN_MODAL',
};

const INITIAL_STATE = false;

export default function modal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case modalConstants.OPEN_MODAL:
      return !state;

    default:
      return state;
  }
}
