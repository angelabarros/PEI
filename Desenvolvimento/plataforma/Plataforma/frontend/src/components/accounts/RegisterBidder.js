import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerBidder } from "../../actions/auth";
import { createMessage } from "../../actions/messages";
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import skills from "../../assets/skills/skills"
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export class RegisterBidder extends Component {
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
          aluno: "false",
          compt: Array()
  };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateSkils=this.updateSkils.bind(this);
  }
    updateSkils = (event, values) => {
    event.preventDefault();
    this.setState({compt: values}, ()=> {console.log(this.state.compt)}
    )
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
      aluno,
      compt
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
        aluno,
        compt
      };
      this.props.registerBidder(newUser);
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
      return <Redirect to="/dashboardBidder" />;
    }
    const { email, password, password2, first_name, last_name,about_me,link,aluno } = this.state;
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
            <Autocomplete
              multiple
              id="fixed-tags-demo"
              options={skills}
              //getOptionLabel={option => option.title}
              onChange={this.updateSkils}
              renderTags={(value, getTagProps) =>(
                value.map((options, index) => (
                  // console.log(value),
                  <Chip label={options} {...getTagProps({ index })} />
                )))
              }
              style={{ width: 500 }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Technologies"
                  variant="outlined"
                  //placeholder="Favorites"
                  fullWidth
                />
              )}
            />
            </div>
            <div className="react__checkbox">
              <label>Aluno</label>
              <input
                type="checkbox"
                className="react__checkbox--input"
                aluno={this.state.aluno}
                onChange={this.handleChange}
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
export default connect(mapStateToProps, { registerBidder, createMessage })(RegisterBidder);