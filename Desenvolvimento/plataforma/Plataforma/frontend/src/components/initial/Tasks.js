import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getTasks, deleteTask } from "../../actions/tasks";

export class Tasks extends Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    getTasks: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getTasks();
  }

  render() {
    return (
      <Fragment>
        <h2>Tarefas</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Data Final</th>
              <th>Preço</th>
              <th>Proponente</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.tasks.map(tasks => (
              <tr key={tasks.id}>
                <td>{tasks.nome}</td>
                <td>{tasks.descricao}</td>
                <td>{tasks.data_fim}</td>
                <td>{tasks.preco}</td>
                <td>{tasks.owner_name}</td>
                <td>
                  <button
                    onClick={this.props.deleteTask.bind(this, tasks.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasks
});

export default connect(mapStateToProps, { getTasks, deleteTask })(Tasks);
