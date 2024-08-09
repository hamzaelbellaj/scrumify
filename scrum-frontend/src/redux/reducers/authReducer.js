
const initialState = {
  token: localStorage.getItem('token'),
  role: localStorage.getItem('role'),
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: action.payload
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
        error: null
      };
    case 'REGISTER_FAILURE':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
