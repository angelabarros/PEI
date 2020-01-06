import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteTask } from "../../actions/tasks";
import { getBidTask, addBidTask } from "../../actions/bids";

export class Task extends Component {
  state = {
    proposta: 0.0
  };

  static propTypes = {
    deleteTask: PropTypes.func.isRequired,
    getBidTask: PropTypes.func.isRequired,
    addBidTask: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const { proposta } = this.state;
    this.props.addBidTask(this.props.task.id, proposta);

    this.setState({
      proposta: 0.0
    });
  };

  render() {
    const { proposta } = this.state;
    const { user, task } = this.props;

    return (
      <Fragment>
        <div className="card bg-light mb-3 mt-3" key={task.id}>
          <div className="card-header">Nome: {task.nome}</div>
          <div className="card-body">
            <h5 className="card-title">Preço: {task.preco} €</h5>
            <p className="card-text">Descrição: {task.descricao}</p>
            <p className="card-text">
              <small className="text-muted">
                console.log("aaaaaaaaaaaaaaaa") Data de término: {task.data_fim}
              </small>
            </p>
            {user && user.is_bidder === false ? (
              <div>
                <button
                  onClick={this.props.deleteTask.bind(this, task.id)}
                  className="btn btn-danger btn-sm"
                  style={{ float: "right" }}
                >
                  Delete
                </button>
                <Link to={`/registar/bid/${task.id}`}>
                  <button
                    onClick={this.props.getBidTask.bind(this, task.id)}
                    className="btn btn-primary btn-sm mr-3"
                    style={{ float: "right" }}
                  >
                    Bids
                  </button>
                </Link>
              </div>
            ) : (
              <div style={{ float: "right" }}>
                <button
                  onClick={this.onSubmit}
                  className="btn btn-primary btn-sm mr-3"
                >
                  Bid
                </button>

                <input
                  style={{ maxWidth: "100px" }}
                  type="number"
                  name="proposta"
                  onChange={this.onChange}
                  min="0"
                  max="9999.99"
                  step=".01"
                  value={proposta}
                />
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  task: state.task.task,
  auth: state.auth
});
export default connect(mapStateToProps, { deleteTask, getBidTask, addBidTask })(
  Task
);
