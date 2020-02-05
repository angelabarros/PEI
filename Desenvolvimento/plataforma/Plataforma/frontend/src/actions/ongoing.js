import { ADD_ONGOING,GET_ONGOING,UPDATE_ONGOING,SEND_TASKON } from "./types";

import axios from "axios";
import { tokenConfig } from "./auth";

export const getOngoing = () => (dispatch,getState) => {
  // Headers
  axios
    .get("/api/ongoing", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ONGOING,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const addOngoing = (worker,task) => (dispatch,getState) => {
  // Headers
  // Request Body
 
  const body = JSON.stringify({worker,task});
  //console.log(body)
  axios
    .post("/api/ongoing/", body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_ONGOING,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const updateOngoing = (task,onGoing) => (dispatch,getState) => {
  // Headers
  
  // Request Body
  const body = JSON.stringify({task,onGoing});
  axios
    .put("/api/atualizar/task", body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UPDATE_ONGOING,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const sendTaskOn = task =>(dispatch) => {
    dispatch({type:SEND_TASKON,payload:task});
};