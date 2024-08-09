import {
    FETCH_TOTALS_REQUEST,
    FETCH_TOTALS_SUCCESS,
    FETCH_TOTALS_FAILURE
  } from '../actions/dashboardActions';
  
  const initialState = {
    loading: false,
    totals: {
      totalSprints: 0,
      totalTasks: 0,
      totalEmployees: 0
    },
    error: null
  };
  
  const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TOTALS_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FETCH_TOTALS_SUCCESS:
        return {
          ...state,
          loading: false,
          totals: action.payload
        };
      case FETCH_TOTALS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default dashboardReducer;
  