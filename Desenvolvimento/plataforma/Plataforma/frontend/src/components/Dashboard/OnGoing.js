import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getOngoing,updateOngoing,sendTaskOn} from "../../actions/ongoing";
import {addReview} from "../../actions/reviews";

import { Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import{
  Button,
  Card,
  CardHeader,
  CardBody,
  CardGroup,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import {Image,Modal} from "react-bootstrap";
import img2 from "../../../../img/profile.jpg";
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

export class OnGoing extends Component {
  constructor(props){
    super(props);
    this.state = {
      show:false,
      show2:false,
      show3:false,
      worker_name:null,
      worker_about:null,
      worker_compt:[],
      crit_1:0,
      crit_2:0,
      crit_3:0,
      task_id:null,
      comentario:""
        };
        this.onChange=this.onChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
        this.handleShow=this.handleShow.bind(this)
        this.handleShow2=this.handleShow2.bind(this)
        this.handleShow3=this.handleShow3.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getOngoing();
  }
    setValue 
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    onSubmit(e){
      e.preventDefault();
      const{
      crit_1,
      crit_2,
      crit_3,
      task_id,
      comentario
        } = this.state
        this.props.updateOngoing(task_id,3)

        this.props.addReview(crit_1,crit_2,crit_3,comentario,task_id)
    }
    handleSubmit(e){
      e.preventDefault();
      const{
      crit_1,
      crit_2,
      crit_3,
      task_id,
      comentario
        } = this.state
        this.props.updateOngoing(task_id,4)

        this.props.addReview(crit_1,crit_2,crit_3,comentario,task_id)
    }
  handleShow = (id) => this.setState({show:true,task_id:id});
  handleShow2 = (id) => this.setState({show2:true,task_id:id});
  handleShow3 = (id,wk_name,wk_about,wk_compt) => 
    this.setState({
      show3:true,
      task_id:id,
      worker_name:wk_name,
      worker_about:wk_about,
      worker_compt:wk_compt
  });


  



  render() {

    var value=0
    
    if(this.props.reviews.reviews.length>0){
       value= makeRating(this.props.reviews.reviews)
    }
    else{
       value=0
    }
    //console.log(value)
    const {show} = this.state;
    const {show2} = this.state;
    const {show3} = this.state;
    const handleClose = ()=> this.setState({show:false});
    const handleClose2 = ()=> this.setState({show2:false});
    const handleClose3 = ()=> this.setState({show3:false});


    const {crit_1,crit_2,crit_3,comentario} = this.state

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
        <h2 className="mt-5">On Going tasks</h2>
        {this.props.ongoing.ongoing.length>0?
          <div>
          {this.props.ongoing.ongoing.map(task => (
            
            <div className="card bg-light mb-3 mt-3" key={task.id}>
              
              
              <div >
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


            
            <div className="card-body">
            <p className="card-text"><b>Descrição Breve:</b> {task.descricao_breve}</p>
            <p className="card-text"><b>Especificação:</b> {task.especificacao}</p>


            <p className="card-text"><b>On work by: </b> 
            <a onClick = { ()=> this.handleShow3(task.id,task.worker_name,task.worker_about,task.worker_compt)}>
              <u>{task.worker_name}</u>
              
              </a>
              <Modal show={show3} onHide={handleClose3}>
              <Card className="card-user">
                <div className="image">
                </div>
                <CardBody>
                  <div className="author">
                    <a >
                      <img alt="..." className="avatar border-grey" src={img2}/>
                      <h5 className="title">
                        {this.state.worker_name}
                      </h5>
                      
                    </a>
                    <p className="text">
                        {this.state.worker_about}
                    </p>
                    <div className={useStyles.root}>
                    {(this.state.worker_compt).map(data => {
                        return(
                          <Chip
                            color="primary"
                            key={data}
                            label={data}
                            //className={useStyles.chip}
                          />);
                      })}
                    </div>

                    
                  </div>
                </CardBody>
              </Card>
              </Modal>
            
            
            </p>








            <p className="card-text"><b>Published by: </b> 
            
              <a onClick = { ()=> this.handleShow2(task.id)}>
              <u>{task.owner.user.first_name + " " + task.owner.user.last_name}</u>
              
              </a>
              <Modal show={show2} onHide={handleClose2}>
              <Card className="card-user">
                <div className="image">
                </div>
                <CardBody>
                  <div className="author">
                    <a >
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
              </div>
              </div>
              <Link to={{pathname:'/chat' }}>
                    <button type="button" className="btn-blue btn-sm mr-3" onClick = {()=>this.props.sendTaskOn(task)} >
                      Chat
                    </button>
                  </Link>
           
              {!this.props.auth.user.user.is_bidder ? 
                <div>
                 {task.onGoing ==1 ? 
                      <button type="button" className="btn-blue btn-sm mr-3" style={{ float: "right" }}
                      onClick={()=>{this.props.updateOngoing(task.id,2),this.props.getOngoing()}} >
                        Received
                      </button>
                      :
                      <div>
                      {task.onGoing==2 ? 
                            <div>
                    <button type="button" className="btn-blue btn-sm mr-3" style={{ float: "right" }}
                    onClick={()=>{this.handleShow(task.id)}} >
                        Review
                    </button>
                    <Modal show={show} onHide={handleClose}>
                              <div className="card card-body mt-4 mb-4">
                          <h2>Review</h2>
                          <form  onSubmit={(e)=>{this.onSubmit(e),this.props.getOngoing()}}>
                            <div className="form-group">
                                 <Box component="fieldset" mb={3} borderColor="transparent">
                                  <Typography component="legend">Availability</Typography>
                                      <Rating
                                        name="crit_1"
                                        value={crit_1}
                                        onChange={this.onChange}
                                      />
                                    </Box>
                                 <Box component="fieldset" mb={3} borderColor="transparent">
                                  <Typography component="legend">Accomplishment</Typography>
                                      <Rating
                                        name="crit_2"
                                        value={crit_2}
                                        onChange={this.onChange}
                                      />
                                    </Box>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                  <Typography component="legend">Submission on Time</Typography>
                                      <Rating
                                        name="crit_3"
                                        value={crit_3}
                                        onChange={this.onChange}
                                      />
                                    </Box>
                            </div>

                          
                            <div className="form-group">
                              <label>Comment</label>
                              <textarea
                                className="form-control"
                                type="text"
                                name="comentario"
                                onChange={this.onChange}
                                value={comentario}
                              />
                            </div>
                       
                            <div className="form-group">
                              <button type="submit" className="btn-blue btn-sm mr-3">
                                Submit
                                </button>
                            </div>
                          </form>
                        </div>
                    </Modal>
                    </div>
                           :
                           <div></div>
                      }
                      </div>
                    }
                    </div>
                  :
                  <div>
                  {task.onGoing==3 ?
                    <div>
                    <button type="button" className="btn-blue btn-sm mr-3" style={{ float: "right" }}
                    onClick={()=>this.handleShow(task.id)} >
                        Review
                    </button>
                    <Modal show={show} onHide={handleClose}>
                              <div className="card card-body mt-4 mb-4">
                          <h2>Review</h2>
                          <form  onSubmit={(e)=>{this.handleSubmit(e),this.props.getOngoing()}}>
                            <div className="form-group">
                                 <Box component="fieldset" mb={3} borderColor="transparent">
                                  <Typography component="legend">Availability</Typography>
                                      <Rating
                                        name="crit_1"
                                        value={crit_1}
                                        onChange={this.onChange}
                                      />
                                    </Box>
                                 <Box component="fieldset" mb={3} borderColor="transparent">
                                  <Typography component="legend">Communication Skills</Typography>
                                      <Rating
                                        name="crit_2"
                                        value={crit_2}
                                        onChange={this.onChange}
                                      />
                                    </Box>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                  <Typography component="legend">Payment on Time</Typography>
                                      <Rating
                                        name="crit_3"
                                        value={crit_3}
                                        onChange={this.onChange}
                                      />
                                    </Box>
                            </div>

                          
                            <div className="form-group">
                              <label>Comment</label>
                              <textarea
                                className="form-control"
                                type="text"
                                name="comentario"
                                onChange={this.onChange}
                                value={comentario}
                              />
                            </div>
                       
                            <div className="form-group">
                              <button type="submit" className="btn-blue btn-sm mr-3">
                                Submit
                                </button>
                            </div>
                          </form>
                        </div>
                    </Modal>
                    </div>
                          :
                          <div></div>
                  }
                  </div>
            }
          </div>

            
              ))}
              </div>
              :
              <h5> No on going tasks</h5>
        }
                   

      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  ongoing:state.ongoing,
  auth: state.auth,
  reviews: state.reviews,
  task_on:state.ongoing.task_on


});
export default connect(mapStateToProps,{getOngoing,updateOngoing,addReview, getReview,sendTaskOn})(OnGoing);
