import React from 'react';
import {sendData, saveUserData 	} from "./../../actions/homeActions";
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { ReactMic } from 'react-mic';
import TextField from 'material-ui/TextField';

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
			email: ""
    }
	}

	getTextInput = (e, type) => {
		this.setState({
			[type]: e.target.value
		});

		let userData = this.props.home.userData;
		userData[type] = e.target.value;
		this.props.saveUserData(userData)
	}

	submit = () => {
		console.log(this.props.home.userData)
		this.props.sendData(this.props.home.userData);
	}

	render(){
		return (
      <div style={{backgroundColor: 'black', height: '138%'}}>
        <Paper zDepth={2} style={{height: '100%'}}>
          <center>
					    <TextField
					      floatingLabelText="First Name"
								onChange={(e) => this.getTextInput( e,"firstName")}
					    /><br />
					    <TextField
					      floatingLabelText="Last Name"
								onChange={(e) => this.getTextInput( e,"lastName")}
					    /><br />
					    <TextField
					      floatingLabelText="Address"
								onChange={(e) => this.getTextInput( e,"address")}
					    /><br />
					    <TextField
					      floatingLabelText="Adhaar Card Number"
								onChange={(e) => this.getTextInput( e,"adhar")}
					    /><br />
					    <TextField
					      floatingLabelText="Phone Number"
								onChange={(e) => this.getTextInput( e,"phno")}
					    /><br />
					    <TextField
					      floatingLabelText="Email ID"
								onChange={(e) => this.getTextInput( e,"email")}
					    /><br />
							{
								this.props.label === "User Data" ?
								<RaisedButton label="Submit" onClick={this.submit} primary={true}/>
								: null
							}
						</center>
        </Paper>
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
