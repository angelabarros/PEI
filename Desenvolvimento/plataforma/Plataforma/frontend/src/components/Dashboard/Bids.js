import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {addBid} from "../../actions/bids";
import {addOngoing,updateOngoing} from "../../actions/ongoing";
import {updateTask} from "../../actions/tasks";
import { Link} from "react-router-dom";
import {getBid} from "../../actions/bids";
import Chip from '@material-ui/core/Chip';
import {getReview} from "../../actions/reviews";

import { Rating } from '@material-ui/lab';
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
import img1 from "../../assets/img/jan-sendereks.jpg";
import img2 from "../../../../img/profile.jpg";
import { makeStyles } from '@material-ui/core/styles';
import '../../index.css';
function makeRating(rev){
  var x=0
  var count=0
  var len = rev.length
  for(var i=0;i < len ;i++){
    x+=(rev[i].crit_1 +rev[i].crit_2 +rev[i].crit_3)/3
  }
  return x/rev.length
}

export class Bids extends Component{
  componentDidMount(){
      this.props.getBid(this.props.task.id);
  }   
   constructor(props) {
    super(props);
    this.state = {
      show:false,
      bid:null
  };
  }
  render(){
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
    const {show} = this.state
    const handleShow = (bid) => {this.setState({show:true,bid:bid}), this.props.getReview(bid.bidder_email)}
    const handleClose = ()=> this.setState({show:false});
    return(
     <Fragment>
        <h2 className="mt-5">Offers</h2>
        <div className="content">
            {
              this.props.bids.length>0 ?
                    <CardGroup >
                      {this.props.bids.map(bid => (
                          <Card  key={bid.id}>
                              <CardBody>
                                <div className="author">
                                   <Image src={img2} style={{ height:'8rem' ,width: '8rem' }} roundedCircle align="center"/>
                                    <h5 className="title" align="center" >
                                         {bid.bidder_nome}
                                    </h5>                              
                                    <p className="text" align="center">
                                       Offer: {bid.proposta} €
                                    </p>
                                </div>
                                <div>
                                  <button type="button" className="btn-blue btn-sm mr-3"  onClick={()=>handleShow(bid)} >
                                        See more info
                                  </button>
                                  
                                  <Modal show={show} onHide={handleClose}>
                                      <Card>
                                        <CardBody>
                                          <div className="author">
                                            <Image src={img2} style={{ height:'8rem' ,width: '8rem' }} roundedCircle align="center"/>
                                              {this.state.bid ? 
                                                <div>
                                              <h5 className="title" align="center" >
                                                     {this.state.bid.bidder_nome}
                                              </h5> 
                                              
                                              <p className="text" align="center">
                                                     {this.state.bid.bidder_about}
                                              </p>

                                              <div className={useStyles.root}>
                                                {(bid.bidder_compt).map(data => {
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
                                              <Rating name="read-only" value={ makeRating(this.props.reviews.reviews) } readOnly />
                                              <p></p>
                                                      <button type="button" className="btn-blue btn-sm mr-3" onClick={()=>{this.props.addOngoing(this.state.bid.bidder_id,this.props.task.id), this.props.history.push("/ongoing")}}>
                                                          Choose this developer
                                                      </button>  
                                                      <p></p>
                                                  <CardBody>
                                                  <div className="author">
                                                    <h2 className="mt-5">     Reviews</h2>
                                                      <div className="card-rows">
                                                      {this.props.reviews.reviews.map(review => (
                                                        <div className="card bg-secondary-lightgray mb-3 mt-3" key={review.id}>
                                                      <div className="card-header">   
                                                      </div>
                                                      <div className="card-body">
                                                        <p className="card-text"><b>Availability</b> <p></p><Rating name="read-only" value={review.crit_1} readOnly /></p>
                                                        <p className="card-text"><b>Quality of Work</b> <p></p><Rating name="read-only" value={review.crit_2} readOnly /></p>
                                                        <p className="card-text"><b>Submission on Time</b> <p></p><Rating name="read-only" value={review.crit_3} readOnly /></p>
                                                        <p className="card-text"><b>Comment </b> <p></p>{review.comentario}</p>
                                                      </div>	              							
                                                    </div>                            				
                                                    ))}
                                                      </div>	


                                                  </div>
                                                  </CardBody>
                                                </div>
                                              : <h5 className="title" align="center" >
                                                     okapa
                                              </h5> }
                                            </div>
                                            
                                          </CardBody>
                                        </Card>
                                  </Modal>      
                                </div>
                            </CardBody>
                          </Card>                 
                ))}
                </CardGroup>
            : <h5 className="title"> No offers </h5>
      }
      </div>  
     </Fragment>         
   );       
  }
}
const mapStateToProps = state => ({
  bid: state.bid,
  task: state.tasks.task,
  bids: state.bids.bids,  
  tasks: state.tasks.tasks,
  auth: state.auth,
  reviews: state.reviews
});
export default connect(mapStateToProps, {getBid,addOngoing, getReview})(Bids);