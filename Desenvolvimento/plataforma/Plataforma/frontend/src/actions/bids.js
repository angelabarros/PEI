import axios from "axios";
import { tokenConfig } from "./auth";
import { returnErrors } from "./messages";
import { ADD_BID_TASK, GET_BIDS_TASK } from "./types";

export const getBidTask = id => (dispatch, getState) => {

  // Headers
  const config = tokenConfig(getState)
  config.params = {task:id}

  axios
    .get("/api/registar/bid/", config)
    .then(res => {
      dispatch({
        type: GET_BIDS_TASK,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD_TASK component
export const addBidTask = (id,proposta) => (dispatch, getState) => {

  const config = tokenConfig(getState)
  config.params = { task:id, proposta: proposta}
  axios
    .post("/api/registar/bid/", config)
    .then(res => {
      dispatch(createMessage({ addBidTask: "Bid Added" }));
      dispatch({
        type: ADD_BID_TASK,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};