import { combineReducers } from "redux";
import tasks from "./tasks";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import bids from "./bids";
import bidders from "./bidders";
import ongoing from "./ongoing";
import reviews from "./reviews";

 //reducers produce the state of your application
export default combineReducers({
  tasks,
  errors,
  messages,
  auth,
  bids,
  bidders,
  reviews,
  ongoing
});
