import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTask } from "../../actions/tasks";

export class Form extends Component {
  state = {
    nome: "",
    descricao: "",
    data_fim: "",
    preco: ""
  };

  static propTypes = {
    addTask: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { nome, descricao, data_fim, preco } = this.state;
    const task = {
      nome,
      descricao,
      data_fim,
      preco
      // user: { email, first_name, last_name, password },
      // aluno: false
    };
    console.log(task);
    this.props.addTask(task);
    //console.log("submit");

    this.setState({
      nome: "",
      descricao: "",
      data_fim: "",
      preco: ""
    });
  };

  render() {
    const { nome, descricao, data_fim, preco } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Adicionar Tarefa</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input
              className="form-control"
              type="text"
              name="nome"
              onChange={this.onChange}
              value={nome}
            />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <textarea
              className="form-control"
              type="text"
              name="descricao"
              onChange={this.onChange}
              value={descricao}
            />
          </div>
          <div className="form-group">
            <label>Data Final</label>
            <textarea
              className="form-control"
              type="date"
              name="data_fim"
              min="2000-01-02"
              onChange={this.onChange}
              value={data_fim}
            />
          </div>
          <div className="form-group">
            <label>Preço</label>
            <textarea
              className="form-control"
              type="number"
              name="preco"
              onChange={this.onChange}
              value={preco}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addTask })(Form);