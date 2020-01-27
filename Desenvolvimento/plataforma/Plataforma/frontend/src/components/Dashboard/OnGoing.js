import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getOngoing,updateOngoing} from "../../actions/ongoing";
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
export class OnGoing extends Component {
  constructor(props){
    super(props);
    this.state = {
      show:false,
      crit_1:0,
      crit_2:0,
      crit_3:0,
      task_id:null,
      comentario:""
        };
        this.onChange=this.onChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
        this.handleShow=this.handleShow.bind(this)
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
        window.location.reload(false)
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
        window.location.reload(false)
    }
  handleShow = (id) => this.setState({show:true,task_id:id});

  render() {
    console.log(this.state.crit_1)
    const {crit_1,crit_2,crit_3,comentario} = this.state
    const {show} = this.state;
    const handleClose = ()=> this.setState({show:false});
    return (
 
      <Fragment>
        <h2 className="mt-5">On Going tasks</h2>
        {this.props.ongoing.ongoing.length>0?
          <div>
          {this.props.ongoing.ongoing.map(task => (
            <div className="card bg-light mb-3 mt-3" key={task.id}>
              
              
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
              </div>


              <div className="card-body">
                
              {!this.props.auth.user.user.is_bidder ? 
                <div>
                 {task.onGoing ==1 ? 
                      <button type="button" className="btn btn-primary" style={{ float: "right" }}
                      onClick={()=>this.props.updateOngoing(task.id,2)} >
                        Received
                      </button>
                      :
                      <div>
                      {task.onGoing==2 ? 
                            <div>
                    <button type="button" className="btn btn-primary" style={{ float: "right" }}
                    onClick={()=>this.handleShow(task.id)} >
                        Review
                    </button>
                    <Modal show={show} onHide={handleClose}>
                              <div className="card card-body mt-4 mb-4">
                          <h2>Review</h2>
                          <form  onSubmit={(e)=>this.onSubmit(e)}>
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
                              <button type="submit" className="btn btn-primary">
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
                        <div className="card bg-light mb-3 mt-3">
                    <button type="button" className="btn btn-primary" style={{ float: "right" }}
                    onClick={()=>this.handleShow(task.id)} >
                        Review
                    </button>
                    <Modal show={show} onHide={handleClose}>
                              <div className="card card-body mt-4 mb-4">
                          <h2>Review</h2>
                          <form  onSubmit={(e)=>this.handleSubmit(e)}>
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
                              <button type="submit" className="btn btn-primary">
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

});
export default connect(mapStateToProps,{getOngoing,updateOngoing,addReview})(OnGoing);
