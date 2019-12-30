import axios from "axios";
import { tokenConfig } from "./auth";
import { returnErrors } from "./messages";
import { ADD_BID_TASK } from "./types";
import { GET_BIDS_TASK } from "./types";

export const getBidTask = id => (dispatch, getState) => {
  const config = tokenConfig(getState);
  //config.headers["task"] = id;
  // console.log(config);

  axios
    .get(
      "/api/registar/bid/",
      {
        params: {
          task: id
        }
      },
      config
    )
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

// // GET TASKS
// export const getTasks = () => (dispatch, getState) => {
//   axios
//     .get("/api/tasks/", tokenConfig(getState))
//     .then(res => {
//       dispatch({
//         type: GET_TASKS,
//         payload: res.data
//       });
//     })
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };
