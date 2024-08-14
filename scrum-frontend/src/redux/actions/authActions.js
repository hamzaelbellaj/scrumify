import axios from 'axios';
import { LOGIN_SUCCESS, REGISTER_SUCCESS, REGISTER_FAILURE } from './types';

export const login = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post('http://20.164.48.110/api/auth/login', credentials);
    const { token, roles, userId } = res.data; // Récupérez l'ID
    const userRole = roles[0].name;

    // Stocker le token, le rôle et l'ID dans le localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    localStorage.setItem('employeeId', userId); // Stockez l'ID de l'utilisateur

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    return userRole;
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};

export const register = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post('http://20.164.48.110/api/auth/register', credentials);
    const { token, roles } = res.data;
    const userRole = roles[0].name; // Assurez-vous que roles n'est pas vide

    // Stocker le token et le rôle dans le localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    return userRole;
  } catch (error) {
    console.error('Register error', error);

    // Gérer l'erreur
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.message
    });

    throw error; // Assurez-vous de relancer l'erreur pour la propager
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  return { type: 'LOGOUT' };
};
