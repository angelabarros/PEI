import axios from "axios";
import { tokenConfig } from "./auth";

import {ADD_REVIEW,GET_REVIEW} from "./types";
//ADD-review
export const addReview = (crit_1,crit_2,crit_3,comentario,task_id) => (dispatch,getState) => {
  // Headers
  // Request Body
  const body = JSON.stringify({crit_1,crit_2,crit_3,comentario, task_id});
  axios
    .post("/api/auth/review", body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_REVIEW,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

//GET-review
export const getReview = email => (dispatch,getState) => {
  // Headers
  // Request Body
  const config = tokenConfig(getState)
  config.params = {email:email}
  
  axios
    .get("/api/auth/review", config)
    .then(res => {
      dispatch({
        type: GET_REVIEW,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};