import axios from "axios";
import { tokenConfig } from "./auth";
import { returnErrors } from "./messages";
import { ADD_BID, GET_BIDS } from "./types";

export const getBid = id => (dispatch, getState) => {

  // Headers
  const config = tokenConfig(getState)
  config.params = {task:id}

  axios
    .get("/api/registar/bid/", config)
    .then(res => {
      dispatch({
        type: GET_BIDS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD_TASK component
export const addBid = (task,proposta) => (dispatch, getState) => {

  const config = tokenConfig(getState)
  /*config.params = { task:id, proposta: proposta}*/
  const body = JSON.stringify({proposta,task})
  axios
    .post("/api/registar/bid/", body,tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addBidTask: "Bid Added" }));
      dispatch({
        type: ADD_BID,
        payload: res.data
      });
    })
    .catch(err =>{
      if(err.response){alert("You can only make one submission per task");}else{alert("Your submission of " + proposta + "€ was made with success" )}
      dispatch(returnErrors(err.response.data, err.response.status))
    }
    );
};