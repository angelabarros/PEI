import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Login extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h1 className="mt-5">Login</h1>
        <p>Please choose your identity</p>
        <div className="row">
          <div className="col-sm-6 mt-5">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Proponent</h5>
                <p className="card-text">  A Proponent in Geeks4Hire is someone that as a need for software developers with quality. Just specify the task you need and choose the developer suitable to your needs </p>
                <Link to={"/login/proponent"}>
                <button type="button" className="btn btn-primary">
                  Proponent
                </button>
              </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-6 mt-5">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Bidder</h5>
                <p className="card-text">A bidder in Geeks4Hire is someone with good IT skills that wants to work with flexibility. Just specify you skills and here you will find all kinds of job that suits their skills.</p>
                <Link to={"/login/bidder"}>
                <button type="button" className="btn btn-primary">
                  Bidder
                </button>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps)(Login);
