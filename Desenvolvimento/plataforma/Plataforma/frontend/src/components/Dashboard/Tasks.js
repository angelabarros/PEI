import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTasks, deleteTask } from "../../actions/tasks";
import { Task } from "./Task"
import { getBidTask, addBidTask } from "../../actions/bids";
export class Tasks extends Component {

  static propTypes = {
    tasks: PropTypes.array.isRequired,
    getTasks: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

 componentDidMount() {
    this.props.getTasks();
  }

  render() {
    
    return (
      <Fragment>
        <h2 className="mt-5">Tarefas</h2>
        <div className="card-rows">
          {this.props.tasks.map(tasks => (
            <Task task={tasks} user={this.props.auth.user} key={tasks.id} deleteTask={deleteTask} getBidTask={getBidTask} addBidTask={addBidTask}/>
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

export default connect(mapStateToProps, { getTasks })(
  Tasks
);
