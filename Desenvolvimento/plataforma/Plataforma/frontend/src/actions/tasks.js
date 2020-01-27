import axios from "axios";
import { tokenConfig } from "./auth";
import { returnErrors } from "./messages";
import { GET_TASKS, DELETE_TASK, ADD_TASK,SEND_TASK } from "./types";


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

// // DELETE TASK
// export const deleteTask = id => (dispatch, getState) => {
//   axios
//     .delete(`/api/tasks/${id}/`, tokenConfig(getState))
//     .then(res => {
//       dispatch(createMessage({ deleteTask: "Task Deleted" }));
//       dispatch({
//         type: DELETE_TASK,
//         payload: id
//       });
//     })
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };

// DELETE TASK
export const deleteTask = id => (dispatch, getState) => {
  axios
    .delete(`/api/tasks/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteTask: "Task Deleted" }));
      dispatch({
        type: DELETE_TASK,
        payload: id
      });
    })
    .catch(err => {
     if(err.response){alert("Your task wasn't deleted")}
        else{alert("You task was deleted with success")}});
};

// ADD_TASK component
export const addTask = task => (dispatch, getState) => {
  axios
    .post("/api/tasks/", task, tokenConfig(getState))
    .then(res => {
    //  alert('Your task was created!')
      dispatch(createMessage({ addTask: "Task Added" }));
      dispatch({
        type: ADD_TASK,
        payload: res.data
      });
    })
    .catch(err =>{
      if(err.response){alert("Task not submitted")}
        else{alert("Your task was created with success")}
      dispatch(returnErrors(err.response.data, err.response.status))
  }
    );

};

export const sendTask = task =>(dispatch) => {
    dispatch({type:SEND_TASK,payload:task});
};
