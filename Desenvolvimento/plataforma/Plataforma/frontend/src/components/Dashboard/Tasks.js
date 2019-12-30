import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getTasks, deleteTask } from "../../actions/tasks";
import { getBidTask } from "../../actions/bids";
export class Tasks extends Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    getTasks: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    getBidTask: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getTasks();
  }

  render() {
    const { user } = this.props.auth;

    return (
      <Fragment>
        <h2 className="mt-5">Tarefas</h2>
        <div className="card-rows">
          {this.props.tasks.map(tasks => (
            <div className="card bg-light mb-3 mt-3" key={tasks.id}>
              <div className="card-header">Nome: {tasks.nome}</div>
              <div className="card-body">
                <h5 className="card-title">Preço: {tasks.preco} €</h5>
                <p className="card-text">Descrição: {tasks.descricao}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Data de término: {tasks.data_fim}
                  </small>
                </p>
                {user && user.is_bidder === false ? (
                  <div>
                    <button
                      onClick={this.props.deleteTask.bind(this, tasks.id)}
                      className="btn btn-danger btn-sm"
                      style={{ float: "right" }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={this.props.getBidTask.bind(this, tasks.id)}
                      className="btn btn-primary btn-sm mr-3"
                      style={{ float: "right" }}
                    >
                      Bids
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasks,
  auth: state.auth
});

export default connect(mapStateToProps, { getTasks, deleteTask, getBidTask })(
  Tasks
);
