import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {addBid} from "../../actions/bids";
import { Link,Redirect} from "react-router-dom";
import { getTasks, deleteTask } from "../../actions/tasks";
import PrivateRoute from "../common/PrivateRoute";
import Bids from "./Bids";
import Button from 'react-bootstrap/Button';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import {Image,Modal} from "react-bootstrap";
import img2 from "../../../../img/profile.jpg";
import{
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

import { Rating } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {getReview} from "../../actions/reviews";
import "../../index.css"

function makeRating(rev){
  var x=0
  var count=0
  var len = rev.length
  for(var i=0;i < len ;i++){
    x+=(rev[i].crit_1 +rev[i].crit_2 +rev[i].crit_3)/3
  }
  return x/rev.length
}

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
export class Task extends Component {
  componentDidMount(){
		this.props.getReview(this.props.task.owner.user.email);
	}
    constructor(props) {
    super(props);
    this.state = {
      proposta:0.0,
      show: false,
      task_id: null
      
  };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleShow=this.handleShow.bind(this);
  }
onChange = e => this.setState({ [e.target.name]:e.target.value});
  onSubmit(task,e){
    //console.log('ollll')
    e.preventDefault();
    const { proposta } = this.state;
    this.props.addBid(task,proposta)
    this.setState({
      proposta: 0.0
    });
    return <Redirect to="/" />;
  };

  handleShow = (id) => this.setState({show:true,task_id:id});

  render() {
    var value=0
    
		if(this.props.reviews.reviews.length>0){
			 value= makeRating(this.props.reviews.reviews)
		}
		else{
			 value=0
    }
    console.log(value)
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
    const user = this.props.auth.user.user;
    const proposta = this.state.proposta;
    const task = this.props.task;
    return (
      <Fragment>
        <h2 className="mt-5">Task</h2>    
        <Fragment>
        <div className="card bg-light mb-3 mt-3" key={task.id}>
          <div className="card-header"><h4><b>{task.nome}</b></h4></div>
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
            <div className="card-body">
            <p className="card-text"><b>Descrição Breve:</b> {task.descricao_breve}</p>
            <p className="card-text"><b>Especificação:</b> {task.especificacao}</p>
            <p className="card-text"><b>Published by: </b> 
            
              <a onClick = { ()=> this.handleShow(task.id)}>
              <u>{task.owner.user.first_name + " " + task.owner.user.last_name}</u>
              
              </a>
              <Modal show={show} onHide={handleClose}>
              <Card className="card-user">
                <div className="image">
                </div>
                <CardBody>
                  <div className="author">
                    <a>
                      <img alt="..." className="avatar border-grey" src={img2}/>
                      <h5 className="title">
                        {task.owner.user.first_name} {task.owner.user.last_name}
                      </h5>
                      
                    </a>
                    <p className="text">
                        {task.owner.user.about_me}
                    </p>
                    <p className="text"> 
                        {task.owner.company}
                    </p>

                    
                    <h2 className="mt-5">     Reviews</h2>
                        <div className="card-rows">
                      	{this.props.reviews.reviews.map(review => (
                      		<div className="card bg-secondary-lightgray mb-3 mt-3" key={review.id}>
	              		  <div className="card-header">   
	              		  </div>
	              		  <div className="card-body">
	              		  	<p className="card-text"><b>Availability</b> <br/><Rating name="read-only" value={review.crit_1} readOnly /></p>
	              		  	<p className="card-text"><b>Clarity</b> <br/><Rating name="read-only" value={review.crit_2} readOnly /></p>
	              		  	<p className="card-text"><b>Payment on Time</b> <br/><Rating name="read-only" value={review.crit_3} readOnly /></p>
	              		  	<p className="card-text"><b>Comment </b> <br/>{review.comentario}</p>
	              		  </div>	              							
                      </div>                            				
                      ))}
                      	</div>	



                  </div>
                </CardBody>
              </Card>
              </Modal>
            
            
            </p>

            
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend"></Typography>
                <Rating name="read-only" value={value} readOnly />
              </Box>
              

            <p className="card-text">
              <small className="text-muted">
                Data de término: {task.data_fim}
              </small>
            </p>
            <div className={useStyles.root}>
                {(stringToArray(task.compt)).map(data => {
                  //console.log(stringToArray(data)),
                  return(
                    <Chip
                      color="primary"
                      key={data}
                      label={data}
                      className={useStyles.chip}
                    />);
                })}
                <p></p>
              </div>



              





            {user && user.is_bidder === false ? (
              <div>
              <Link to = '/dashboardProponent'>
                <button
                  onClick={this.props.deleteTask.bind(this, task.id)}
                  className="btn btn-danger btn-sm"
                  style={{ float: "right" }}
                >
                  Delete
                </button>
               </Link> 
                    <Link to='/bids'>
                        <button type="button" className="btn-blue btn-sm mr-3" >
                          See offers
                        </button>
                  </Link>                                 
               </div>
            ) : (
            <div>
                <button
                      onClick={(e)=>this.onSubmit(task.id,e)}
                      className="btn-blue btn-sm mr-3"
                      style={{ float: "right" }}
                    >
                      Fazer Proposta
                    </button>
                    <input
                      style={{ maxWidth: "100px" }}
                      type="number"
                      name="proposta"
                      onChange={this.onChange}
                      min="0"
                      max="9999.99"
                      value={proposta}
                    />
              </div>
             )}
          </div>
        </div>
      </Fragment>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  task: state.tasks.task,
  tasks: state.tasks.tasks,
  auth: state.auth,
  reviews: state.reviews
});
export default connect(mapStateToProps, { deleteTask, addBid, getReview})(Task);