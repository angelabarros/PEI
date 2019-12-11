import axios from "axios";
import { tokenConfig } from "./auth";

import { GET_TASKS, DELETE_TASK, ADD_TASK } from "./types";

// GET TASKS
export const getTasks = () => (dispatch, getState) => {
  axios
    .get("/api/tasks/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_TASKS,
        payload: res.data
      });
      //console.log(res.data);
    })
    .catch(err => console.log(err));
};

// DELETE LEADS
export const deleteTask = id => dispatch => {
  axios
    .delete(`/api/tasks/${id}/`)
    .then(res => {
      dispatch({
        type: DELETE_TASK,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD_TASK component
export const addTask = ({ nome, descricao, data_fim, preco }) => (
  dispatch,
  getState
) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({
    nome,
    descricao,
    data_fim,
    preco
  });
  console.log(body);
  axios
    .post("/api/tasks/", body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_TASK,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
