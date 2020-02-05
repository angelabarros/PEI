import axios from "axios";
import { tokenConfig } from "./auth";
import { returnErrors } from "./messages";
import { GET_CHAT, ADD_CHAT } from "./types";



export const getChat = task_id => (dispatch, getState) => {
  const config = tokenConfig(getState)
  config.params = {task_id:task_id}
  //console.log('aquoi');

  axios
    .get("api/auth/chat", config)
    .then(res => {
      dispatch({
        type: GET_CHAT,
        payload: res.data
      });
    })
    .catch(err =>{
      dispatch(returnErrors(err.response.data, err.response.status));
    
    }
    );
};




export const addChat = (user_manda,about_task,mensagem) => (dispatch, getState) => {

  const config = tokenConfig(getState)
  /*config.params = { task:id, proposta: proposta}*/
  const body = JSON.stringify({user_manda,about_task,mensagem})
  axios
    .post("/api/auth/chat", body,tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_CHAT,
        payload: res.data
      });
    })
    .catch(err =>{
      dispatch(returnErrors(err.response.data, err.response.status))
    }
    );
};