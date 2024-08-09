// taskReducer.js

// Exemple de reducer pour la gestion des tâches

const initialState = {
    tasks: [],
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_TASKS':
        return { ...state, tasks: action.payload };
      // Ajouter d'autres cas de réduction si nécessaire
      default:
        return state;
    }
  };
  
  export default taskReducer;
  