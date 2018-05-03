import React from 'react';
import {connect} from "react-redux";
import {Tabs, Tab} from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Header } from '../../components/Header';
import { verify, reset } from "./../../actions/homeActions";
import ImageCapture from './../ImageCapture/imageCapture.js';
import VoiceRecorder from './../VoiceRecorder/voiceRecorder.js';
import VerifyScreen from './../VerifyScreen/verifyScreen.js';

class Home extends React.Component{
	constructor(props) {
		super(props);
		this.props = props;
		this.state={
			images: localStorage.getItem('images') ? JSON.parse(localStorage.getItem('images')) : [],
			imageFile: null,
			imageText: null,
			search: null,
      activeStep: '0',
      open: false,
			value: "0"
		}
	}

	handleChange = (value) => {
		this.setState({
			value: value,
		});
		this.props.reset();
		if(value === "2"){
			if(Object.keys(this.props.home.userData).length === 0){
				return;
			}
			if(this.props.type !== 'register'){
				this.props.verify(this.props.home.userData);
			}
		}
  };

	render(){
		return (
				<div style={{ height: '100%', backgroundColor: '#303030' }}>
				<Header />
        <Tabs
					value={this.state.value}
        	onChange={this.handleChange}
				>
          <Tab label="Capture Image" value='0'>
            <ImageCapture imageCount={this.props.type? 5 : 3} type={this.props.type}/>
          </Tab>
          <Tab label="Voice Recognition" value='1'>
						<VoiceRecorder type={this.props.type}/>
          </Tab>
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
		}
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
