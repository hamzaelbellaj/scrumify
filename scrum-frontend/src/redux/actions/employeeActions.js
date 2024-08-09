import axios from 'axios';

// Action Types
export const FETCH_EMPLOYEES_REQUEST = 'FETCH_EMPLOYEES_REQUEST';
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
export const FETCH_EMPLOYEES_FAILURE = 'FETCH_EMPLOYEES_FAILURE';
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';

// Action Creators
export const fetchEmployeesRequest = () => ({
  type: FETCH_EMPLOYEES_REQUEST
});

export const fetchEmployeesSuccess = (employees) => ({
  type: FETCH_EMPLOYEES_SUCCESS,
  payload: employees
});

export const fetchEmployeesFailure = (error) => ({
  type: FETCH_EMPLOYEES_FAILURE,
  payload: error
});

export const addEmployee = (employee) => ({
  type: ADD_EMPLOYEE,
  payload: employee
});

export const updateEmployee = (employee) => ({
  type: UPDATE_EMPLOYEE,
  payload: employee
});

export const deleteEmployee = (employeeId) => ({
  type: DELETE_EMPLOYEE,
  payload: employeeId
});

// Async Actions
export const fetchEmployees = () => {
  return async (dispatch) => {
    dispatch(fetchEmployeesRequest());
    try {
      const response = await axios.get('http://localhost:8080/api/employees', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(fetchEmployeesSuccess(response.data));
    } catch (error) {
      dispatch(fetchEmployeesFailure(error.message));
    }
  };
};

export const createEmployee = (newEmployee) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:8080/api/employees', newEmployee, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(addEmployee(response.data));
    } catch (error) {
      console.error('Erreur lors de la création de l\'employé:', error);
    }
  };
};

export const modifyEmployee = (employeeId, updatedEmployee) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/employees/${employeeId}`, updatedEmployee, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(updateEmployee(response.data));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'employé:', error);
    }
  };
};

export const removeEmployee = (employeeId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(deleteEmployee(employeeId));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'employé:', error);
    }
  };
};
