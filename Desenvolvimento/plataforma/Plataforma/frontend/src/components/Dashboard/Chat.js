import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getChat,addChat} from "../../actions/chat";
import { Link,Redirect} from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute";
import Button from 'react-bootstrap/Button';
import { makeStyles } from '@material-ui/core/styles';
import "../../assets/chat.css";
import RefreshIcon from '@material-ui/icons/Refresh';
import {IconButton} from '@material-ui/core';


export class Chat extends Component {
    constructor(props) {
    super(props);
    this.state ={
      chat:this.props.chat.chat,
      message_txt:null,
    }


  }

  componentDidMount(){
    //console.log(this.props.task_on.id);
    //console.log(this.props.task_on.id)
		this.props.getChat(this.props.task_on.id);
                
	}



  handleChange = event => {
    this.setState({ message_txt: event.target.value });
  };

  handleSubmit = (user_id,task_id,event) => {
    event.preventDefault();
    this.props.addChat(user_id,task_id,this.state.message_txt);
    //console.log(this.state.message_txt);
    event.target.reset();
    //window.location.reload(false);

  };


  render() {
    return (
      <div className="chatWindow">
        <ul className="chat" id="chatList">
          {this.props.chat.map(data => (
            <div key={data.id}>
              {this.props.auth.user.user.id === data.user_manda ? (

                <li className="self">
                  <div className="msg">
                    <p> You: </p>
                    <div className="message"> {data.mensagem}</div>
                  </div>
                </li>
              ) : (
              <div>
              {!this.props.auth.user.user.is_bidder ?
                <li className="other">
                  <div className="msg">
                    <p>{data.worker_name}:</p>
                   <div className="message"> {data.mensagem} </div>
                  </div>
                </li>
                :
               <li className="other">
                  <div className="msg">
                    <p>{this.props.task_on.owner.user.first_name + ' ' + this.props.task_on.owner.user.last_name }:</p>
                   <div className="message"> {data.mensagem} </div>
                  </div>
                </li>
              }
              </div>
              )}
            </div>
          ))}
        </ul>
         <div className="chatInputWrapper">
          <form onSubmit={(e)=>this.handleSubmit(this.props.auth.user.user.id,this.props.task_on.id,e)}>
            <input
              className="textarea input"
              type="text"
              placeholder="Enter your message..."
              onChange={this.handleChange}
            />
          </form>
            <IconButton aria-label="refresh"  onClick={()=>this.props.getChat(this.props.task_on.id)}>

                <RefreshIcon />
            </IconButton>
        </div>

        

      </div>
    );
    


  }
}
const mapStateToProps = state => ({
  chat: state.chat.chat,
  auth: state.auth,
  task_on:state.ongoing.task_on

});
export default connect(mapStateToProps, {getChat,addChat})(Chat);