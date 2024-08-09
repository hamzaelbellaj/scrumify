import axios from 'axios';

export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';

export const fetchTasks = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8080/api/manager/tasks', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Récupérer le token depuis le localStorage
      }
    });
    dispatch({ type: FETCH_TASKS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_TASKS_FAILURE, payload: error });
  }
};