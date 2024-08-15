import axios from 'axios';

export const FETCH_SPRINTS = 'FETCH_SPRINTS';
export const ADD_SPRINT = 'ADD_SPRINT';
export const UPDATE_SPRINT = 'UPDATE_SPRINT';
export const DELETE_SPRINT = 'DELETE_SPRINT';
export const ADD_TASK_TO_SPRINT = 'ADD_TASK_TO_SPRINT';
export const REMOVE_TASK_FROM_SPRINT = 'REMOVE_TASK_FROM_SPRINT';

const API_URL = 'https://scrumify.engineer/api/manager/sprints';

export const fetchSprints = () => async (dispatch) => {
  const response = await axios.get(API_URL);
  dispatch({ type: FETCH_SPRINTS, payload: response.data });
};

export const addSprint = (sprint) => async (dispatch) => {
  const response = await axios.post(API_URL, sprint);
  dispatch({ type: ADD_SPRINT, payload: response.data });
};

export const updateSprint = (sprint) => async (dispatch) => {
  const response = await axios.put(`${API_URL}/${sprint.id}`, sprint);
  dispatch({ type: UPDATE_SPRINT, payload: response.data });
};

export const deleteSprint = (id) => async (dispatch) => {
  await axios.delete(`${API_URL}/${id}`);
  dispatch({ type: DELETE_SPRINT, payload: id });
};

export const addTaskToSprint = (sprintId, task) => async (dispatch) => {
  await axios.post(`${API_URL}/${sprintId}/tasks`, task);
  dispatch({ type: ADD_TASK_TO_SPRINT, payload: { sprintId, task } });
};

export const removeTaskFromSprint = (sprintId, task) => async (dispatch) => {
  await axios.delete(`${API_URL}/${sprintId}/tasks`, { data: task });
  dispatch({ type: REMOVE_TASK_FROM_SPRINT, payload: { sprintId, task } });
};
