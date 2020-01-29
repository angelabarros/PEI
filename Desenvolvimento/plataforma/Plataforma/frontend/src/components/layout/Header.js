import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { dashboard } from "../../actions/auth";
import {ButtonToolbar, DropdownButton,Dropdown} from 'react-bootstrap';
import { MDBCol, MDBFormInline, MDBBtn } from "mdbreact";
import icon from "../../images/icon.png"
import {filterTask,getTasks} from "../../actions/tasks";

function stringToArray(props) {
  props = props.replace('"', '')
  props = props.replace('"', '')
  props = props.replace('[', '')
  props = props.replace(']', '')
  props = props.split("'").join("")
  props = props.split(" ").join("")
  props = props.split(",")
return props;
}
export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: []
        }
        
    }





  render() {
    var image ={
  height:50
}


    const { isAuthenticated,user} = this.props.auth;

    const authLinks = (

      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <span className="navbar-text mr-3">
          <strong>
            {user ? `Welcome ${user.user.first_name} ${user.user.last_name}` : ""}
          </strong>
       </span>
   
  
        {
        user && user.user.is_bidder===true ? <li className="nav-item mr-2">

                                       <ButtonToolbar>
                                            <DropdownButton
                                              drop={'down'}
                                              variant="secondary"
                                              title={` Menu `}
                                              id={`dropdown-button-drop-down`}
                                              key={'down'}
                                            >
                                              <Dropdown.Item eventKey="1" href="/#/dashboardBidder">
                                                    See Tasks
                                              </Dropdown.Item>
                                              <Dropdown.Item eventKey="2" href="/#/ongoing"> 

                                                On Going tasks

                                              </Dropdown.Item>
                                              <Dropdown.Item eventKey="2" href="/#/profileB"> 

                                                Profile

                                              </Dropdown.Item>

                                              <Dropdown.Divider />

                                              <Dropdown.Item onClick={this.props.logout} eventKey="3">
                                                Logout
                                              </Dropdown.Item>

                                            </DropdownButton>                                       
                                           </ButtonToolbar>

                                  </li> : <li className="nav-item mr-2">
                                    <ButtonToolbar>
                                            <DropdownButton
                                              drop={'down'}
                                              variant="secondary"
                                              title={` Menu `}
                                              id={`dropdown-button-drop-down`}
                                              key={'down'}
                                            >
                                              <Dropdown.Item eventKey="1" href="/#/dashboardProponent">
                                                    My Tasks
                                              </Dropdown.Item>

                                              <Dropdown.Item eventKey="2" href="/#/register/task"> 

                                                  Post a Task

                                              </Dropdown.Item>
                                              
                                              <Dropdown.Item eventKey="2" href="/#/ongoing"> 

                                                On Going tasks

                                              </Dropdown.Item>
                                              <Dropdown.Item eventKey="2" href="/#/profileP"> 

                                                Profile

                                              </Dropdown.Item>

                                              <Dropdown.Divider />

                                              <Dropdown.Item onClick={this.props.logout} eventKey="3" >
                                                Logout
                                              </Dropdown.Item>

                                            </DropdownButton>                                       
                                           </ButtonToolbar>
                                           
                                          </li>
        }
   </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );
    
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">
              <img src={icon} style={image}/>
            </a>
          </div>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  tasks: state.tasks.tasks,
  filtered:state.tasks.filtered
});

export default connect(mapStateToProps, { logout,filterTask,getTasks})(Header);
