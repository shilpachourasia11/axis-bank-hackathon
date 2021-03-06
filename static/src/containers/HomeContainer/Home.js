import React from 'react';
import { connect } from "react-redux";
import { Tabs, Tab } from 'material-ui/Tabs';
import { Header } from '../../components/Header';
import { verify, reset, saveUserData } from "./../../actions/homeActions";
import ImageCapture from './../ImageCapture/imageCapture.js';
import VoiceRecorder from './../VoiceRecorder/voiceRecorder.js';
import VerifyScreen from './../VerifyScreen/verifyScreen.js';
import VoiceVerification from './../VoiceVerification/voiceVerify.js';

class Home extends React.Component{
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			images: localStorage.getItem('images') ? JSON.parse(localStorage.getItem('images')) : [],
			imageFile: null,
			imageText: null,
			search: null,
      activeStep: '0',
      open: false,
			value: "1",
			stopRecording: false
		}
	}

	componentWillReceiveProps(nextProps){
		if(this.props.type !== nextProps.type && nextProps.type === 'register'){
			this.setState({
				value: "0"
			});
		}
		this.props = nextProps;

		if(this.props.home.verified){
			this.setState({
				stopRecording: true,
				value: "2"
			});
			this.props.reset();
		}

		if(this.props.home.error && this.state.stopRecording === false && this.props.type !== 'register'){
			this.setState({
				stopRecording: true
			});
		}
	}

	resetRecorder = () => {
		this.setState({
			stopRecording: false
		});
	}

	componentWillMount(){
		if(this.props.type === 'register'){
			this.setState({
				value: "0"
			});
		}
	}

	handleChange = (value) => {
		this.setState({
			value: value,
		});
		this.props.reset();
  };

	render(){
		console.log(this.props.type)
		return (
				<div style={{ height: '100%', backgroundColor: '#303030' }}>
				<Header resetUserData={this.props.saveUserData}/>
        <Tabs
					value={this.state.value}
        	onChange={this.handleChange}
				>
					{
						this.props.type === 'register' ?
						<Tab label="Capture Image" value='0'>
							<ImageCapture imageCount={this.props.type? 5 : 3} type={this.props.type}/>
						</Tab>
						: null
					}
					{
						this.props.type === 'register' ?
						<Tab label="Voice Recognition" value='1'>
							<VoiceRecorder type={this.props.type}/>
						</Tab>
						:
						<Tab label="Voice Recognition" value='1'>
							<VoiceVerification type={this.props.type} stopRecording={this.state.stopRecording} resetRecorder={this.resetRecorder}/>
						</Tab>
					}
          <Tab
            label={this.props.type ? "User Data": "Verification"} value='2'>
						<VerifyScreen value={this.state.value} label={this.props.type ? "User Data": "Verification"}/>
          </Tab>
        </Tabs>
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
		verify: (data) => {
			dispatch(verify(data))
		},
		reset: () => {
			dispatch(reset())
		},
		saveUserData: (data) => {
			dispatch(saveUserData(data))
		}
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
