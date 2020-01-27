import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {addBid} from "../../actions/bids";
import { Link} from "react-router-dom";
import { getTasks, sendTask } from "../../actions/tasks";
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import {getReview} from "../../actions/reviews";
import {makeRating } from "./ProfileBidder"
import{
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardTitle,
	FormGroup,
	Form,
	Input,
	Row,
	Col
} from "reactstrap";

import {Image,Modal} from "react-bootstrap";
import img2 from "../../assets/img/mike.jpg";

import { Rating } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function stringToArray(props) {
    props = props.replace('"', '')
    props = props.replace('"', '')
    props = props.replace('[', '')
    props = props.replace(']', '')
    props = props.split("'").join("")
    props = props.split(" ").join("")
    props = props.split(",")
  return props;
}
export class Tasks extends Component {
  constructor(props){
    super(props);

    this.state = {
      show: false,
      task_id: null
    };

    this.handleShow=this.handleShow.bind(this)

  }


  componentDidMount() {
    this.props.getTasks();
  }

  handleShow = (id) => this.setState({show:true,task_id:id});
  
  render() {
    // var value=0
		// if(this.props.reviews.reviews.length>0){
		// 	 value= makeRating(this.props.reviews.reviews)
		// }
		// else{
		// 	 value=0
		// }
    const {show} = this.state;
    const handleClose = ()=> this.setState({show:false});

    const useStyles = makeStyles(theme => ({
      root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(0.5),
      },
      chip: {
        margin: theme.spacing(0.5),
      },
    }));
    return (
      <Fragment>
        <h2 className="mt-5">Tasks</h2>
        <div className="card-rows">
          {this.props.tasks.map(task => (
            // array = stringToArray(task.compt),
            // console.log(array),
            <div className="card bg-light mb-3 mt-3" key={task.id}>
              <div className="card-header"><h4><b>{task.nome}</b></h4>   
              </div>
              <Row>
              <Col>
              <p className="card-body">
              <b>Published:</b> {task.data_inicio}
              </p>
              </Col>
              <Col>
              <p className="card-body">
              <b>Deadline:</b> {task.data_fim}
              </p>
              </Col>
              <Col>
              <p className="card-body">
              <b>Price range: </b>{task.preco_min} € - {task.preco_max} €
              </p>
              </Col>
              </Row>
              <div className="card-body">{task.descricao_breve}   
              </div>
              <div className="card-body">
              <div className={useStyles.root}>
                {(stringToArray(task.compt)).map(data => {
                  //console.log(stringToArray(data)),
                  return(
                    <Chip
                      color="primary"
                      key={data}
                      label={data}
                      //className={useStyles.chip}
                    />);
                })}
              </div>


              <Row>
              <Col>
              <p></p>
              <p className="card-text">


              <a onClick = { ()=> this.handleShow(task.id)}>
              {task.owner.user.first_name + " " + task.owner.user.last_name}
              </a>
              </p>
              </Col>
                
              <Col>
              <Link to={'/task' } >
                <button type="button" className="btn btn-primary" style={{ float: "right" }} onClick={()=>this.props.sendTask(task)} >
                  Show More
                </button>
              </Link>
              </Col>
              </Row>
              </div>
            </div>
              ))}
              </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  task:state.tasks.task,
  tasks: state.tasks.tasks,
  auth: state.auth,
});
export default connect(mapStateToProps,{getTasks,sendTask})(Tasks);
