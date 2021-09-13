export default (
  state = { isError: { status: false, errorMessage: null } },
  action
) => {
  switch (action.type) {
    case 'FAIL_RECEIVE_DATA':
      return {
        ...state,
        isError: { status: true, errorMessage: action.payload.message },
      };

    default:
      return state;
  }
};
