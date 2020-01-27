import React, { Fragment,Component } from "react";
import icon from "../../images/icon.png";
import background2 from "../../images/background2.jpeg";
import "../../index.css";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Image from 'react-bootstrap/Image'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import store from "../../store"
import {loadUser} from "../../actions/auth"


const mapStateToProps = state =>({
  isAuthenticated:state.auth.isAuthenticated,
  isLoading:state.auth.isLoading,
  user:state.auth.user
});


export class InitialPage extends Component {
render(){
    if(this.props.isLoading){
      return <h2> Loading</h2>;
    }
    else if(!this.props.isAuthenticated){
      return(
                <Fragment>
                  <section className="section">
                  </section>

                  <div>
                    <div className="hero-text">
                      
                      <h2>Welcome to Geeks4Hire</h2>
                      <h3> We simply software freelancing</h3>
                      <Button variant="dark" href="/#/register" size="lg" active>
                        Register
                        </Button>
                      <Button variant="dark" href="/#/login" size="lg" active>
                        Login
                      </Button>

                    </div>


                  </div>


                </Fragment >
                );
              }
          else if(this.props.user.user.is_bidder){
            return <Redirect to="/dashboardBidder" />;

            }
            else{
              return <Redirect to="/dashboardProponent" />;
            }
          }
}

export default connect(mapStateToProps)(InitialPage);
