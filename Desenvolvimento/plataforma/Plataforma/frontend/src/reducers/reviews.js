import { ADD_REVIEW, GET_REVIEW } from "../actions/types";

const initialState = {
  reviews: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload]
      };
    case GET_REVIEW:
      return {
        ...state,
        reviews: action.payload
      };
      default:
        return state;
      }
    }
    