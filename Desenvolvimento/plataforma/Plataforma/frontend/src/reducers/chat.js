import { GET_CHAT, ADD_CHAT} from "../actions/types";

const initialState = {
  chat: []
  
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CHAT:
      return {
        ...state,
        chat: action.payload
      };
    case ADD_CHAT:
      return {
        ...state,
        chat: [...state.chat, action.payload]
      };
    default:
      return state;
  }
}
