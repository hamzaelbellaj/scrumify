export const FETCH_TOTALS_REQUEST = 'FETCH_TOTALS_REQUEST';
export const FETCH_TOTALS_SUCCESS = 'FETCH_TOTALS_SUCCESS';
export const FETCH_TOTALS_FAILURE = 'FETCH_TOTALS_FAILURE';

export const fetchTotalsRequest = () => ({
  type: FETCH_TOTALS_REQUEST
});

export const fetchTotalsSuccess = (totals) => ({
  type: FETCH_TOTALS_SUCCESS,
  payload: totals
});

export const fetchTotalsFailure = (error) => ({
  type: FETCH_TOTALS_FAILURE,
  payload: error
});

export const fetchTotals = () => {
  return async (dispatch) => {
    dispatch(fetchTotalsRequest());
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://scrumify.engineer/api/manager/totals', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      dispatch(fetchTotalsSuccess(data));
    } catch (error) {
      dispatch(fetchTotalsFailure(error));
    }
  };
};
