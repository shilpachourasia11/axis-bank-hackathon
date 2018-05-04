import React from 'react';
import {sendData, saveUserData 	} from "./../../actions/homeActions";
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { ReactMic } from 'react-mic';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class VerifyScreen extends React.Component{
	constructor(props) {
		super(props);
		this.props = props;
    this.state = {
			firstName: "",
			lastName: "",
			address: "",
			adhar: "",
			phno: "",
			email: "",
			fnameError: "",
			lnameError: "",
			addrError: "",
			cardError: "",
			phError: "",
			idError: "",
			message: "",
			error: false,
			popup: false
    }
	}

	componentWillReceiveProps(nextProps){
		this.props = nextProps;

		if(this.props.value !== "2"){
			return;
		}
		else{
			let data = this.props.home.userData;
			let imageCount = 0;
			let audoCount = 0;
			if(Object.keys(data).length === 0){
				if(this.props.label === "User Data"){
					this.setState({
						popup: true,
						message: "Please capture atleast 4 images and 3 audio clips before proceeding."
					});
				}
				else{
					this.setState({
						popup: true,
						message: "Please capture atleast 2 images and 1 audio clip before proceeding."
					});
				}
			}
			else{
				Object.keys(data).map((key, index)=>{
					if(key === 'image1'){
						imageCount++;
					}
					if(key === 'image2'){
						imageCount++;
					}
					if(key === 'image3'){
						imageCount++;
					}
					if(key === 'image4'){
						imageCount++;
					}
					if(key === 'audioClip1'){
						audoCount ++;
					}
					if(key === 'audioClip2'){
						audoCount ++;
					}
					if(key === 'audioClip3'){
						audoCount ++;
					}
				})
				if(this.props.label === "User Data"){
					if(imageCount !== 4){
						this.setState({
							popup: true,
							message: "Please capture atleast 4 images."
						});
					}
					else if(audoCount !== 3){
						this.setState({
							popup: true,
							message: "Please record 3 audio clips."
						});
					}
					else{
						this.setState({
							popup: false,
							message: ""
						});
					}
				}
				else{
					if(imageCount < 2){
						this.setState({
							popup: true,
							message: "Please capture atleast 2 images."
						});
					}
					else if(audoCount === 0){
						this.setState({
							popup: true,
							message: "Please record atleast 1 audio clip."
						});
					}
					else{
						this.setState({
							popup: false,
							message: ""
						});
					}
				}
			}
		}
	}

	getTextInput = (e, type) => {
		this.setState({
			[type]: e.target.value
		});

		let userData = this.props.home.userData;
		userData[type] = e.target.value;
		this.props.saveUserData(userData);
	}

	submit = () => {
		console.log(this.props.home.userData)
		let data = this.props.home.userData;
		let imageCount = 0;
		let audoCount = 0;
		if(Object.keys(data).length === 0){
			this.setState({
				popup: true,
				message: "Please capture atleast 3 images and 1 audio clip before proceeding."
			});
			return;
		}
		else{
			Object.keys(data).map((key, index)=>{
				if(key === 'image1'){
					imageCount++;
				}
				if(key === 'image2'){
					imageCount++;
				}
				if(key === 'image3'){
					imageCount++;
				}
				if(key === 'image4'){
					imageCount++;
				}
				if(key === 'audioClip1'){
					audoCount ++;
				}
				if(key === 'audioClip3'){
					audoCount ++;
				}
				if(key === 'audioClip2'){
					audoCount ++;
				}
			})
			if(imageCount !== 4){
				this.setState({
					popup: true,
					message: "Please capture atleast 4 images."
				});
				return;
			}
			else if(audoCount !== 3){
				this.setState({
					popup: true,
					message: "Please record 3 audio clips."
				});
				return;
			}
			else{
				this.setState({
					popup: false,
					message: ""
				});
			}
		}

		if(data.firstName === "" || data.firstName === undefined){
			this.setState({
				fnameError: "First Name Can not be empty"
			});
			return;
		}
		else{
			this.setState({
				fnameError: ""
			});
		}
		if(data.address === "" || data.address === undefined){
			this.setState({
				addrError: "Address Can not be empty"
			});
			return;
		}
		else{
			this.setState({
				addrError: ""
			});
		}
		if(data.adhar === "" || data.adhar === undefined){
			this.setState({
				cardError: "Adhaar number can not be empty"
			});
			return;
		}
		else{
			this.setState({
				cardError: ""
			});
		}
		if(data.phno === "" || data.phno === undefined){
			this.setState({
				phError: "Phone number can not be empty"
			});
			return;
		}
		else{
			this.setState({
				phError: ""
			});
		}
		if(data.email === "" || data.email === undefined){
			this.setState({
				idError: "Email ID can not be empty"
			});
			return;
		}
		else{
			this.setState({
				idError: ""
			});
		}
		this.props.sendData(this.props.home.userData);
	}


  handleClose = () => {
    this.setState({popup: false});
  };

	render(){
		let verifiedData = this.props.home.verifiedData;

		const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ];

		return (
      <div style={{backgroundColor: 'black'}}>
        <Paper zDepth={2} style={{height: '100%'}}>
					{
						this.props.home.error === false && Object.keys(this.props.home.verifiedData).length === 0 && this.props.label !== "User Data"?
						"Loading..."
						:
							this.props.label !== "User Data" ?
							(<center>
								<TextField
									floatingLabelText="Name"
									value={verifiedData['Name']}
								/><br />
								<TextField
									floatingLabelText="Address"
									value={verifiedData['Address']}
								/><br />
								<TextField
									floatingLabelText="Adhaar Card Number"
									value={verifiedData['Aadhar Card Number']}
								/><br />
								<TextField
									floatingLabelText="Phone Number"
									value={verifiedData['Phone Number']}
								/><br />
								<TextField
									floatingLabelText="Email ID"
									value={verifiedData['Email ID']}
								/><br />
								{
									this.props.label === "User Data" ?
									<RaisedButton label="Submit" onClick={this.submit} primary={true}/>
									: null
								}
							</center>)
							:
							(
								<center>
								<TextField
									floatingLabelText="Name"
									onChange={(e) => this.getTextInput( e,"firstName")}
									errorText={this.state.fnameError}
								/><br />
								<TextField
									floatingLabelText="Address"
									onChange={(e) => this.getTextInput( e,"address")}
									errorText={this.state.addrError}
								/><br />
								<TextField
									floatingLabelText="Adhaar Card Number"
									onChange={(e) => this.getTextInput( e,"adhar")}
									errorText={this.state.cardError}
								/><br />
								<TextField
									floatingLabelText="Phone Number"
									onChange={(e) => this.getTextInput( e,"phno")}
									errorText={this.state.phError}
								/><br />
								<TextField
									floatingLabelText="Email ID"
									onChange={(e) => this.getTextInput( e,"email")}
									errorText={this.state.idError}
								/><br />
								{
									this.props.label === "User Data" ?
									<RaisedButton label="Submit" onClick={this.submit} primary={true}/>
									: null
								}
							</center>)

					}
						<Snackbar
							open={this.props.home.error || this.props.home.success}
							message={this.props.home.message}
							autoHideDuration={4000}
							onRequestClose={this.handleRequestClose}
						/>
        </Paper>

				<Dialog
          title="Error"
          actions={actions}
          modal={false}
          open={this.state.popup}
          onRequestClose={this.handleClose}
        >
          {this.state.message}
        </Dialog>
      </div>
		)
	}
}

const mapStateToProps= (state) => {
	return{
		home: state.homeReducer,
	};
};

const mapDispatchToProps= (dispatch) => {
	return{
    saveUserData: (data) => {
			dispatch(saveUserData(data))
		},
		sendData: (data) => {
			dispatch(sendData(data))
		}
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(VerifyScreen);
