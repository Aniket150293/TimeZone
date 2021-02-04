const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_COUNTRY_LIST':
      return { ...state, loading: true };
    case 'COUNTRY_LIST_RECEIVED':
      return { ...state, countryList: action.json, loading: false }
    case 'FETCH_TIME':
        return { ...state, loading: true };
    case 'FETCH_TIME_SUCCESS':
        return { ...state, time: action.json, loading: false }
    default:
      return state;
  }
};

export default reducer;
