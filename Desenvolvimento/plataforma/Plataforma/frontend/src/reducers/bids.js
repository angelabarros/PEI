import { ADD_BID_TASK, GET_BIDS_TASK } from "../actions/types";

const initialState = {
  tasks: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_BID_TASK:
      return {
        ...state,
        bids: action.payload
      };
    case GET_BIDS_TASK:
      return {
        ...state,
        bids: action.payload
      };
    default:
      return state;
  }
}
