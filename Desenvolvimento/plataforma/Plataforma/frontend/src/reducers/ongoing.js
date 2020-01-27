import { ADD_ONGOING,GET_ONGOING,UPDATE_ONGOING } from "../actions/types";

const initialState = {
  ongoing: []
};

export default function(state = initialState, action) {
  switch (action.type) {
 
    case ADD_ONGOING:
      return {
        ...state,
        ongoing: [...state.ongoing, action.payload]
      };

    case GET_ONGOING:
      return {
        ...state,
        ongoing: action.payload
      };
      default:
        return state;
      }
      }