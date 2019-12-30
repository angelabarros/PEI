import { GET_TASKS, DELETE_TASK, ADD_TASK, BID_TASKS } from "../actions/types";

const initialState = {
  tasks: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BID_TASKS:
      return {
        ...state,
        bids: action.payload
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(lead => lead.id !== action.payload)
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    default:
      return state;
  }
}
