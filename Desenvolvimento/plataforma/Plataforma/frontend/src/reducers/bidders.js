import { GET_BIDDERS } from "../actions/types";

const initialState = {
  bidders: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BIDDERS:
      return {
        ...state,
        bidders: action.payload
      };
      default:
        return state;
      }
    }
