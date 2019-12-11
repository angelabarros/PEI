import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Login extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Link to={"/login/proponent"}>
          <button type="button" className="btn btn-primary">
            Proponent
          </button>
        </Link>
        <Link to={"/login/bidder"}>
          <button type="button" className="btn btn-primary">
            Bidder
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
