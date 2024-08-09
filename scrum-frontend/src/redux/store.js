import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Assurez-vous d'utiliser l'importation correcte
import employeeReducer from './reducers/employeeReducer';
import authReducer from './reducers/authReducer'; // Assurez-vous que le chemin est correct

const rootReducer = combineReducers({
  auth: authReducer,
  employeeReducer,
  // Ajoutez d'autres reducers ici si nécessaire
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
