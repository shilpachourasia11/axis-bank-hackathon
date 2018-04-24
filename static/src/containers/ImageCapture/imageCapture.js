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
import Camera from 'react-camera';
import './imgCapture.scss';

class ImageCapture extends React.Component{
	constructor(props) {
		super(props);
		this.props = props;
		this.state={
			images: localStorage.getItem('images') ? JSON.parse(localStorage.getItem('images')) : [],
			imageFile: null,
			imageText: null,
			search: null,
      activeStep: '0',
			image1: null,
			image2: null,
			image3: null,
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

	takePicture = () => {
    this.camera.capture()
    .then(blob => {
			let key = this.state.key;
			let imgKey = 'image' + key;
			this.setState({
				[imgKey] : URL.createObjectURL(blob)
			});
			this.convertImageFormat(blob)
    })
  }

	convertImageFormat = (blob)=> {
		let reader = new FileReader();
		reader.readAsDataURL(blob);
		var that = this;
		reader.onloadend = function() {
    	let base64data = reader.result;
			let key = that.state.key;
			let userData = that.props.home.userData;
			let imgKey = 'image' + key;
			userData[imgKey] = base64data;
			that.props.saveUserData(userData);
			that.setState({
				key: key + 1
			});
 		}
	}

	render(){

		const style = {
		  preview: {
		    position: 'relative'
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
		    margin: 50
		  },
		  captureImage: {
		    width: '100%',
		  }
		};

    const stylePic = {
      height: 100,
      width: 100,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };

		const imgStyle = {
			height: 100,
      width: 100,
      margin: 15
		}
		return (
      <div>
        <Paper zDepth={2}>
          <Divider />
					{
						this.state.image1 ?
						<img  style={imgStyle} src={this.state.image1}/>
						:
						<Paper style={stylePic} zDepth={4} />
					}
					{
						this.state.image2 ?
						<img style={imgStyle} src={this.state.image2}/>
						:
						<Paper style={stylePic} zDepth={4} />
					}
					{
						this.state.image3 ?
						<img style={imgStyle} src={this.state.image3}/>
						:
						<Paper style={stylePic} zDepth={4} />
					}

					<Camera
	          style={style.preview}
	          ref={(cam) => {
	            this.camera = cam;
	          }}
	        >
					<div style={style.captureContainer} onClick={this.takePicture}>
					 <div style={style.captureButton} />
				 	</div>
				 </Camera>
        </Paper>
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


export default connect(mapStateToProps, mapDispatchToProps)(  ImageCapture);
