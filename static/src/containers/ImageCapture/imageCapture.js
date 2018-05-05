import React from 'react';
import { saveUserData } from "./../../actions/homeActions";
import {connect} from "react-redux";
import {Tabs, Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery'
import './imgCapture.scss';
import Webcam from 'react-webcam';
var b64toBlob = require('b64-to-blob');

class ImageCapture extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			images: localStorage.getItem('images') ? JSON.parse(localStorage.getItem('images')) : [],
			imageFile: null,
			imageText: null,
			search: null,
      activeStep: '0',
			image1: "https://clicknathan.com/wp-content/uploads/2013/07/avatar-2.jpg",
			image2: "https://clicknathan.com/wp-content/uploads/2013/07/avatar-2.jpg",
			image3: "https://clicknathan.com/wp-content/uploads/2013/07/avatar-2.jpg",
			image4: "https://clicknathan.com/wp-content/uploads/2013/07/avatar-2.jpg",
			key: 1
		}
	}

	componentWillReceiveProps(props){
		this.props = props;
		if(this.props.home.dataReady){
			this.setState({
				images: this.props.home.allImages,
				openPopUp: false
			})
			this.props.reset()
		}
	}

	capture = () => {
    const imageSrc = this.webcam.getScreenshot();
		let key = this.state.key;
		let imgKey = 'image' + key;
		let userData = this.props.home.userData;
		userData[imgKey] = imageSrc;
		this.props.saveUserData(userData);
		this.setState({
			key: key + 1
		});

		this.setState({
			[imgKey] : imageSrc
		});
  };

	onFileLoad = (event )=> {
		var input = event.target;
		var reader = new FileReader();
		var that = this;
		reader.onload = function(){
      var dataURL = reader.result;
			let userData = that.props.home.userData;
			let key = that.state.key;
			let imgKey = 'image' + key;
			userData[imgKey] = dataURL;
			that.props.saveUserData(userData);
			that.setState({
				key: key + 1,
				imageFile: dataURL,
				[imgKey]: dataURL
			}, () => {
				console.log(this.state)
			});
    };
    reader.readAsDataURL(input.files[0]);
	}

	render(){
		const style = {
		  preview: {
		    position: 'relative',
		  },
		  captureContainer: {
		    display: 'flex',
		    position: 'absolute',
		    justifyContent: 'center',
		    zIndex: 1,
		    bottom: 0,
		    width: '50%'
		  },
		  captureButton: {
		    backgroundColor: '#fff',
		    borderRadius: '50%',
		    height: 56,
		    width: 56,
		    color: '#000',
		  }
		};

		const imgStyle = {			
			width: '100px',	
			maxWidth: '100%',
			height: '100px',
			maxHeight: '100%',
			display: 'inline-block',
			marginLeft: '15px',
		}

		return (
      <div style={{height: 'calc(100vh - 122px)'}}>
					<div style={{marginTop: '10px'}}>
						<img style={imgStyle} alt="Smiley face" src={this.state.image1}/>
						<img style={imgStyle} alt="Smiley face" src={this.state.image2}/>
						<img style={imgStyle} alt="Smiley face" src={this.state.image3}/>
						<img style={imgStyle} alt="Smiley face" src={this.state.image4}/>
					</div>
					<div>
						<center>
							<Webcam
								style={style.preview}
								audio={false}
								height={ window.innerHeight - 300 }
								ref={this.setRef}
								screenshotFormat="image/jpeg"
								width={350}
								ref = {
									(webcam) => {
										this.webcam = webcam;
									}
								}
							/>

							<p>
								<button style={style.captureButton} onClick={this.capture}><b>Click</b></button>
							</p>
						</center>
					</div>
      </div>
		)
	}
}

const mapStateToProps= (state) => {
	return{
		home: state.homeReducer
	};
};

const mapDispatchToProps= (dispatch) => {
	return{
    saveUserData: (data) => {
			dispatch(saveUserData(data))
		}
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ImageCapture);
