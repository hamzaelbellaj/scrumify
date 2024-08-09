import { FETCH_SPRINTS, ADD_SPRINT, UPDATE_SPRINT, DELETE_SPRINT, ADD_TASK_TO_SPRINT, REMOVE_TASK_FROM_SPRINT } from './sprintActions';

const initialState = {
  sprints: []
};

const sprintReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPRINTS:
      return { ...state, sprints: action.payload };

    case ADD_SPRINT:
      return { ...state, sprints: [...state.sprints, action.payload] };

    case UPDATE_SPRINT:
      return {
        ...state,
        sprints: state.sprints.map(sprint =>
          sprint.id === action.payload.id ? action.payload : sprint
        )
      };

    case DELETE_SPRINT:
      return {
        ...state,
        sprints: state.sprints.filter(sprint => sprint.id !== action.payload)
      };

    case ADD_TASK_TO_SPRINT:
      return {
        ...state,
        sprints: state.sprints.map(sprint => {
          if (sprint.id === action.payload.sprintId) {
            return {
              ...sprint,
              tasks: [...sprint.tasks, action.payload.task]
            };
          }
          return sprint;
        })
      };

    case REMOVE_TASK_FROM_SPRINT:
      return {
        ...state,
        sprints: state.sprints.map(sprint => {
          if (sprint.id === action.payload.sprintId) {
            return {
              ...sprint,
              tasks: sprint.tasks.filter(task => task.id !== action.payload.task.id)
            };
          }
          return sprint;
        })
      };

    default:
      return state;
  }
};

export default sprintReducer;
