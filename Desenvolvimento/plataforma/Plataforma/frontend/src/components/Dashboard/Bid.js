import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBidTask } from '../../actions/bids'
export class Bid extends Component {
  static propTypes = {
    bids: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
  }

  render() {
    const { user } = this.props.auth;

    return (
      <Fragment>
        <h2 className="mt-5">Propostas</h2>
        <div className="card-rows">
          {this.props.bids.length === 0 ? <h5 className="mt-5">Não existem propostas</h5> :
          this.props.bids.map(bids => (
            <div className="card bg-light mb-3 mt-3" key={bids.id}>
              <div className="card-header">Nome: {bids.bidder.first_name} {bids.bidder.last_name}</div>
              <div className="card-body">
                <h5 className="card-title">Preço: {bids.proposta} €</h5>
                <p className="card-text">
                  <small className="text-muted">
                    Data da proposta: {bids.data_proposta}
                  </small>
                </p>
              </div>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  bids: state.bids.bids,
  auth: state.auth
});
export default  connect(mapStateToProps)(Bid);