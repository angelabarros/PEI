import { ADD_BID, GET_BIDS } from "../actions/types";
const initialState = {
  bids: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_BID:
      return {
        ...state,
        bids: [...state.bids, action.payload]
      };
    case GET_BIDS:
      return {
        ...state,
        bids: action.payload
      };
    default:
      return state;
  }
}