export default (
  state = { isError: { status: false, error: null } },
  action
) => {
  switch (action.type) {
    case 'FAIL_RECEIVE_DATA':
      return { ...state, isError: { status: true, error: action.payload } };

    default:
      return state;
  }
};
