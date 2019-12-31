import axios from "axios";
import { tokenConfig } from "./auth";
import { returnErrors } from "./messages";
import { ADD_BID_TASK } from "./types";
import { GET_BIDS_TASK } from "./types";

export const getBidTask = id => (dispatch, getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    params: {
      task: id
    }
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

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
