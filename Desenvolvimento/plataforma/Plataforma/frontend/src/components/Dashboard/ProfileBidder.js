import React from "react";
import {connect} from "react-redux";
import {updateBidder} from "../../actions/auth";
import {getReview} from "../../actions/reviews";
import { Rating } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
import img1 from "../../assets/img/jan-sendereks.jpg";
import img2 from "../../../../img/profile.jpg"
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import skills from "../../assets/skills/skills"
import {Image,Modal} from "react-bootstrap";
function makeRating(rev){
		var x=0
		var count=0
		var len = rev.length
		for(var i=0;i < len ;i++){
			x+=(rev[i].crit_1 +rev[i].crit_2 +rev[i].crit_3)/3
		}
		return x/rev.length
	}
class ProfileBidder extends React.Component{
	componentDidMount(){
		this.props.getReview(this.props.auth.user.user.email);
	}
	constructor(props){
		super(props);
		this.state={
			about_me:this.props.auth.user.user.about_me,
			link:this.props.auth.user.user.link,
			compt:this.props.auth.user.compt,
			reviews:this.props.reviews,
			show:false
		};
		this.onChange=this.onChange.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.updateSkils=this.updateSkils.bind(this);
		this.state.compt = this.state.compt.replace('"', '')
		this.state.compt = this.state.compt.replace('"', '')
		this.state.compt = this.state.compt.replace('[', '')
		this.state.compt = this.state.compt.replace(']', '')
		this.state.compt = this.state.compt.split("'").join("")
		this.state.compt = this.state.compt.split(" ").join("")
		this.state.compt = this.state.compt.split(",")
	}
	onChange = e => this.setState({[e.target.name]: e.target.value})
	onSubmit = e => {
		e.preventDefault();
		const{about_me,link, compt}=this.state;
		this.props.updateBidder(about_me,link, compt);
	}
	updateSkils = (event, values) => {
		event.preventDefault();
		//console.log(values)
		this.setState({compt: values}//, ()=> {console.log(this.state.compt)}
		)
	}
	
	render(){
		var value=0
		if(this.props.reviews.reviews.length>0){
			 value= makeRating(this.props.reviews.reviews)
		}
		else{
			 value=0
		}
		const{about_me,link}=this.state;
		const { compt } = this.state;
		const{
			isAuthenticated
		} = this.props.auth;
		const{user} = this.props.auth.user;

		const {show} = this.state
    	const handleShow = () => this.setState({show:true});
		const handleClose = ()=> this.setState({show:false});
		
		return(
			<>
			<div className="content">
				<Row>
					<Col md="4">
					<Card className="card-user">
					<div className="image">
					</div>
					<CardBody>
						<div className="author">
							<a href="#pablo" onClick={e=> e.preventDefault()}>
								<img alt="..." className="avatar border-grey" src={img2}/>
								<h5 className="title">
									{user.first_name} {user.last_name}
								</h5>
							</a>
							<p className="text">
									{user.about_me}
									</p>
						</div>
						   <div>
                      <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend"> My Rating </Typography>
                        <Rating name="read-only" value={value} readOnly />
						<p></p>

						<a onClick={()=>handleShow()}>
	                        <h6><u> See Reviews </u></h6>
	                     </a>




	                     <Modal show={show} onHide={handleClose}>
							<Card className="card-user">
							<p></p>
							<p></p>
								<CardBody>
								<div className="author">
									<h2 className="mt-5">     Reviews</h2>
										<div className="card-rows">
										{this.props.reviews.reviews.map(review => (
											<div className="card bg-secondary mb-3 mt-3" key={review.id}>
										<div className="card-header">   
										</div>
										<div className="card-body">
											<p className="card-text"><b>Availability</b> <p></p><Rating name="read-only" value={review.crit_1} readOnly /></p>
											<p className="card-text"><b>Accomplishment</b> <p></p><Rating name="read-only" value={review.crit_2} readOnly /></p>
											<p className="card-text"><b>Submission on Time</b> <p></p><Rating name="read-only" value={review.crit_3} readOnly /></p>
											<p className="card-text"><b>Comment </b> <p></p>{review.comentario}</p>
										</div>	              							
									</div>                            				
									))}
										</div>	


								</div>
								</CardBody>
							</Card>
							</Modal>





                      </Box>
                    </div>
					</CardBody>
				</Card>
			</Col>
			<Col md="8">
				<Card className="card-user">
					<CardHeader>
						<CardTitle tag="h5"> Edit Profile</CardTitle>
					</CardHeader>
					<CardBody>
						<Form onSubmit={this.onSubmit}>
							<Row>
								<Col className="p1-1" md="4">
										<FormGroup>
										<label htmlFor="exampleInputEmail1">  Email Adress</label>
										<Input
											defaultValue={user.email}
											disabled
											placeholder="Company"
											type="email"
										/>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col className="pr-1" md="6">
									<FormGroup>
										<label> First Name </label>
										<Input
											defaultValue={user.first_name}
											disabled
											placeholder="First Name"
											type="text"
										/>
									</FormGroup>
								</Col>
								<Col className="pl-1" md="6">
									<FormGroup>
										<label> Last Name </label>
										<Input
											defaultValue={user.last_name}
											disabled
											placeholder="Last Name"
											type="text"
										/>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col md="12">
									<FormGroup>
										<label> About me </label>
										<Input
											type="textarea"
											default={user.about_me}
											placeholder="About me"
											name="about_me"
											onChange={this.onChange}
											value={about_me}
										/>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col md="12">
									<FormGroup>
										<label> link </label>
										<Input
											type="url"
											default={user.link}
											placeholder="Link"
											name="link"
											onChange={this.onChange}
											value={link}
										/>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col md="12">
								<FormGroup>
									<label> My Skills </label>
									<Autocomplete
										multiple
										id="fixed-tags-demo"
										options={skills}
										value={compt}
										//getOptionLabel={option => option.title}
										onChange={this.updateSkils}
										renderTags={(value, getTagProps) =>(
											value.map((options, index) => (
											// console.log(value),
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
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<div className="update ml-auto mr-auto">
									<Button 
										className="btn-round"
										color="primary"
										type="submit"
									>
										Update Profile
									</Button>
								</div>
							</Row>
						</Form>
					</CardBody>
				</Card>
			</Col>
		</Row>
	</div>
	</>
		);
	}
}
const mapStateToProps = state =>({
	auth:state.auth,
	reviews:state.reviews
})
export default connect (mapStateToProps,{updateBidder,getReview})(ProfileBidder);