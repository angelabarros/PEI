import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTask } from "../../actions/tasks";
import { Link, Redirect } from "react-router-dom";
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import skills from "../../assets/skills/skills"
export class Form extends Component {
    constructor(props) {
    super(props);
    this.state = {
      //redirect:false,
      nome: "",
      descricao_breve: "",
      especificacao:"",
      data_fim: "",
      preco_min: 0.00,
      preco_max:0.00,
      compt:[]
  };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateSkils=this.updateSkils.bind(this);
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const { nome, descricao_breve,especificacao, data_fim, preco_min,preco_max,compt } = this.state;
    const task = {
      nome,
      descricao_breve,
      especificacao,
      data_fim,
      preco_min,
      preco_max,
      compt
    };
    this.props.addTask(task);
    this.setState({
      //redirect:false,
      nome: "",
      descricao_breve: "",
      especificacao:"",
      data_fim: "",
      preco_min: 0.00,
      preco_max:0.00,
      compt:[]
  });
  }
  updateSkils = (event, values) => {
    event.preventDefault();
    this.setState({compt: values})
  }
  render() {
    //if(this.state.redirect){
     //return ( <Redirect to='/'/>)
    //}
    const { nome, descricao_breve, especificacao, data_fim, preco_min,preco_max,compt } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Submit a Task</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="nome"
              onChange={this.onChange}
              value={nome}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              type="text"
              name="descricao_breve"
              onChange={this.onChange}
              value={descricao_breve}
            />
          </div>
          <div className="form-group">
            <label>Especification</label>
            <textarea
              className="form-control"
              type="text"
              name="especificacao"
              onChange={this.onChange}
              value={especificacao}
            />
          </div>
          <div className="form-group">
            <Autocomplete
              multiple
              id="fixed-tags-demo"
              options={skills}
              value={compt}
              onChange={this.updateSkils}
              renderTags={(value, getTagProps) =>(
                value.map((options, index) => (
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
          <div className="form-group">
            <label>Final Date</label>
            <input
              className="form-control"
              type="date"
              name="data_fim"
              min="2000-01-02"
              onChange={this.onChange}
              value={data_fim}
            />
          </div>
          <div className="form-group">
            <label>Minimum Price</label>
            <input
              className="form-control"
              type="number"
              name="preco_min"
              onChange={this.onChange}
              min="0"
              max="9999.99"
              step=".01"
              value={preco_min}
            />
          </div>
          <div className="form-group">
            <label>Maximum Price</label>
            <input
              className="form-control"
              type="number"
              name="preco_max"
              onChange={this.onChange}
              min="0"
              max="9999.99"
              step=".01"
              value={preco_max}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn-blue btn-sm mr-3">
              Submit
              </button>
          </div>
        </form>
      </div>
    );
  }
}
export default connect(null, { addTask })(Form);