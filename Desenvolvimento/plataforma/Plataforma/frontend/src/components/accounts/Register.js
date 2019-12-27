import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Register extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h1 className="mt-5">Register</h1>
        <p>Please choose your identity</p>
        <div className="row">
          <div className="col-sm-6 mt-5">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Proponent</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <Link to={"/register/proponent"}>
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
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <Link to={"/register/bidder"}>
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
