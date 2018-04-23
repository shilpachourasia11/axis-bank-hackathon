import React from 'react';
import {saveImage,reset,getJobTypes} from "./../../actions/homeActions";
import {connect} from "react-redux";
import {Tabs, Tab} from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Header } from '../../components/Header';

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

  handleActive = () => {

  }

	handleChange = (value) => {
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
            <ImageCapture imageCount={this.props.type? 5 : 3}/>
          </Tab>
          <Tab label="Voice Recognition" value='1'>
						<VoiceRecorder/>
          </Tab>
          <Tab
            label="Verification" value='2'>
						<VerifyScreen/>
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
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
