import React from 'react';
import {saveImage,reset,getJobTypes} from "./../../actions/homeActions";
import {connect} from "react-redux";

import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery'
import Camera from 'react-camera';

class App extends React.Component{
	constructor(props) {
		super(props);
		this.props = props;
		this.state={
			images: localStorage.getItem('images') ? JSON.parse(localStorage.getItem('images')) : [],
			imageFile: null,
			imageText: null,
			search: null
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

	onPageChange = (page) => {
		this.setState({page});
		let serverObj = {
			page: (page-1)
		}
		if(this.state.value != 0){
			serverObj.jobType = this.state.value
		}
		this.props.saveImage(serverObj)
	}

	componentWillMount() {
	}

	addImages = (event) => {
		this.setState({
			openPopUp: true
		})
	}

	handleClose = (event) => {
		this.setState({
			openPopUp: false
		})
	}

	chooseFile = () => {
		$("#files").click();
	}

	onFileLoad = (event )=> {
		var input = event.target;
		var reader = new FileReader();
		var that = this
		reader.onload = function(){
      var dataURL = reader.result;
			that.setState({
				imageFile: dataURL
			})
    };
    reader.readAsDataURL(input.files[0])
	}

	handleUpload = () => {
		let data = {
			text: this.state.imageText,
			imageUrl: this.state.imageFile,
		}
		this.props.saveImage(data)
	}

	takePicture = () => {
    this.camera.capture()
    .then(blob => {
      this.img.src = URL.createObjectURL(blob);
      this.img.onload = () => { URL.revokeObjectURL(this.src); }
    })
  }

	render(){
		const actions = [
		 <FlatButton
			 label="Upload"
			 primary={true}
			 onClick={this.handleUpload}
		 />,
	 	];

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
		    width: '100%'
		  },
		  captureButton: {
		    backgroundColor: '#fff',
		    borderRadius: '50%',
		    height: 56,
		    width: 56,
		    color: '#000',
		    margin: 20
		  },
		  captureImage: {
		    width: '100%',
		  }
		};

		return (
      <div>
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
			 <img
          style={style.captureImage}
          ref={(img) => {
            this.img = img;
          }}
        />
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
		saveImage: (data) => {
			dispatch(saveImage(data))
		},
		reset: () => {
			dispatch(reset())
		}
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
