import axios from "axios";
import { tokenConfig } from "./auth";
import { returnErrors } from "./messages";
import { GET_TASKS, DELETE_TASK, ADD_TASK, BID_TASKS } from "./types";

// GET TASKS
export const getTasks = () => (dispatch, getState) => {
  axios
    .get("/api/tasks/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_TASKS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE LEADS
export const deleteTask = id => dispatch => {
  axios
    .delete(`/api/tasks/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteTask: "Task Deleted" }));
      dispatch({
        type: DELETE_TASK,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD_TASK component
export const addTask = task => (dispatch, getState) => {
  axios
    .post("/api/tasks/", task, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addTask: "Task Added" }));
      dispatch({
        type: ADD_TASK,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
