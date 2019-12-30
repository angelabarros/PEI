import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Bid extends Component {
  
  render() {
    
    return (
      <Fragment>
        {this.props}
      </Fragment>
    );
  }
}

export default connect()(Bid);