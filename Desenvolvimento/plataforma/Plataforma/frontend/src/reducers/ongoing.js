import { GET_ONGOING,UPDATE_ONGOING, SEND_TASKON } from "../actions/types";

const initialState = {
  ongoing: [],
  task_on:JSON.parse(localStorage.getItem("task_on")),
};

export default function(state = initialState, action) {
  switch (action.type) {
 
    
    case SEND_TASKON:
    localStorage.setItem("task_on",JSON.stringify(action.payload));
      return{
        ...state,
        task_on:action.payload 
    }
    

    case GET_ONGOING:
      return {
        ...state,
        ongoing: action.payload
      };
      default:
        return state;
      }
      }