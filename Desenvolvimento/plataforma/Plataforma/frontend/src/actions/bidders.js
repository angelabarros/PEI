import axios from "axios";
import { tokenConfig } from "./auth";
import { returnErrors } from "./messages";
import { GET_BIDDERS } from "./types";
// GET TASKS
export const getBidders = () => (dispatch, getState) => {
  axios
    .get("/api/auth/bidder/bidders", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_BIDDERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};