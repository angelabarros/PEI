import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerProponent } from "../../actions/auth";
import { createMessage } from "../../actions/messages";

export class RegisterProponents extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    aluno: "false"
  };

  static propTypes = {
    registerProponent: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      email,
      password,
      password2,
      first_name,
      last_name,
      aluno
    } = this.state;
    if (password != password2) {
      this.props.createMessage({
        passwordNotMatch: "Passwords não são iguais"
      });
    } else {
      const newUser = {
        email,
        first_name,
        last_name,
        password,
        aluno
      };
      this.props.registerProponent(newUser);
    }
  };
  handleChange = () => {
    if (this.state.aluno == "false") {
      this.setState({ aluno: "true" });
    } else {
      this.setState({ aluno: "false" });
    }
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboardProponent" />;
    }

    const { email, password, password2, first_name, last_name } = this.state;

    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="name"
                className="form-control"
                name="first_name"
                onChange={this.onChange}
                value={first_name}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="name"
                className="form-control"
                name="last_name"
                onChange={this.onChange}
                value={last_name}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { registerProponent, createMessage })(
  RegisterProponents
);
//export default Register;
