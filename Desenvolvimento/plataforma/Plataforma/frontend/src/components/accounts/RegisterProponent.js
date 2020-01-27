import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerProponent } from "../../actions/auth";
import { createMessage } from "../../actions/messages";


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export class RegisterProponent extends Component {
    constructor(props) {
    super(props);
    this.state = {
          isAuthenticated:false,
          email: "",
          password: "",
          password2: "",
          first_name: "",
          last_name: "",
          about_me:"",
          link:"",
          company:""
  };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit = e => {
    e.preventDefault();
    const {
      email,
      password,
      password2,
      first_name,
      last_name,
      about_me,
      link,
      company
    } = this.state;
    if (password != password2) {
      this.props.createMessage({
        passwordNotMatch: "Passwords não são iguais"
      });
    } 
    else {
      const newUser = {
        email,
        first_name,
        last_name,
        password,
        about_me,
        link,
        company
      };
      this.props.registerProponent(newUser);
    }
  };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboardProponent" />;
    }

    const { email, password, password2, first_name, last_name,about_me, link, company } = this.state;

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
              <label>Company</label>
              <input
                type="name"
                className="form-control"
                name="company"
                onChange={this.onChange}
                value={company}
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
              <label> About Me </label>
              <textarea
                className="form-control"
                type="text"
                name="about_me"
                onChange={this.onChange}
                value={about_me}
              />
            </div>
            <div className="form-group">
              <label> Link </label>
              <input
                className="form-control"
                type="url"
                name="link"
                onChange={this.onChange}
                value={link}
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

export default connect(mapStateToProps, { registerProponent, createMessage })(RegisterProponent);
