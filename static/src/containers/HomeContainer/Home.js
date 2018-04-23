import React from 'react';
import {connect} from "react-redux";
import {Tabs, Tab} from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Header } from '../../components/Header';
import { verify } from "./../../actions/homeActions";

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
      open: false
		}
	}

	handleChange = (value) => {
		if(value === "2"){
			if(this.props.type !== 'register'){
				this.props.verify(this.props.home.userData);
			}
		}
    this.setState({
      value: value,
    });
  };


	render(){
		console.log(this.props)
		return (
				<div>
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
						<VerifyScreen label={this.props.type ? "User Data": "Verification"}/>
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
		}
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
