import { GET_TASKS, DELETE_TASK, ADD_TASK, SEND_TASK,FILTERED_TASK} from "../actions/types";

const initialState = {
  tasks: [],
  task:JSON.parse(localStorage.getItem("task")),
  filtered:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case SEND_TASK:
      localStorage.setItem("task",JSON.stringify(action.payload));
        return{
          ...state,
          task:action.payload 
      }
    case FILTERED_TASK:
      return{
        ...state,
        task:action.payload
      } 
    default:
      return state;
  }
}
