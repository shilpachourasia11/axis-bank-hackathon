import React from 'react';
import {saveImage,reset,getJobTypes} from "./../../actions/homeActions";
import {connect} from "react-redux";
import ImageList from './../../components/imageList/imageList'
import UltimatePaginationMaterialUi from '../../components/Table';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery'

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

	getSearchText = (e, text) => {
		this.setState({
			search: text
		}, () => {
			setTimeout(this.search(this.state.search), 5000)
		})
	}
	search = (substring) => {
		let allImages = this.state.images
		let index
		let newData = []
		if(substring == ""){
			this.setState({
				images: JSON.parse(localStorage.getItem('images'))
			})
			return
		}
		for(index = 0; index < allImages.length; index ++){
			if(allImages[index].imageUrl.text.includes(substring)){
				newData.push(allImages[index])
			}
		}
		this.setState({
			images: newData
		})

	}
	getURLText = (e, text) => {
		this.setState({
			imageFile: text
		})
	}
	getText = (e, text) => {
		this.setState({
			imageText: text
		})
	}
	render(){
		const style = {
			floatingButton: {
				float: 'right',
				marginTop: '-40px'
			},
			raisedButton: {
				width: '50%'
			},
			hiddenButton: {
				height:'0px',
				overflow:'hidden'
			},
			vl: {
				borderLeft: '1px solid black',
	 			height: '95px',
				float: 'right',
				marginRight: '48%',
    		marginTop: '-50px'
			},
			textUrl: {
				marginLeft: '45px'
			},
			imageText: {
				marginTop: '70px'
			}
		};
		const actions = [
		 <FlatButton
			 label="Upload"
			 primary={true}
			 onClick={this.handleUpload}
		 />,
	 ];
		return (
      <div>
				<TextField
		      hintText="Search Text"
					onChange={this.getSearchText}
		    /><br />
				<FloatingActionButton mini={true} secondary={true} style={style.floatingButton} onClick={this.addImages}>
		      <ContentAdd />
		    </FloatingActionButton>
        <ImageList list={this.state.images} loading={this.props.home.loading}/>


				<Dialog
        title="Add Photo"
        actions={actions}
        modal={false}
        open={this.state.openPopUp}
        onRequestClose={this.handleClose}
      	>
					<RaisedButton label="Choose file" labelPosition="before" onClick={this.chooseFile} style= {style.raisedButton}>
					  <input id="files" type="file" style={style.hiddenButton} onChange={this.onFileLoad}/>
					</RaisedButton>

					<TextField
						hintText="Image URL"
						style={style.textUrl}
						onChange={this.getURLText}
					/>

					<div style={style.vl}/>

					<TextField
						hintText="Image Text"
						style={style.imageText}
						onChange={this.getText}
					/>

      	</Dialog>

				{/* <center>
					<UltimatePaginationMaterialUi
						currentPage={this.state.page}
						totalPages={this.state.total}
						onChange={this.onPageChange}
					/>
				</center> */}
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
