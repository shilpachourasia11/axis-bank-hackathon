import React from 'react';
import {saveImage} from "./../../actions/homeActions";
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { ReactMic } from 'react-mic';

class VoiceRecorder extends React.Component{
	constructor(props) {
		super(props);
		this.props = props;
    this.state = {
      record: false
    }
	}

  startRecording = () => {
    this.setState({
      record: true
    });
  }

  stopRecording = () => {
    this.setState({
      record: false
    });
  }

  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
  }


	render(){
		return (
      <div style={{backgroundColor: 'black', height: '138%'}}>
        <Paper zDepth={2} style={{height: '100%', padding: '100px'}}>
          <center>
            <ReactMic
              record={this.state.record}
              className="sound-wave"
              onStop={this.onStop}
              strokeColor="#000000"
              backgroundColor="#FF4081" />
              <br/>
            <RaisedButton onTouchTap={this.startRecording} type="button">Start</RaisedButton>
            <RaisedButton onTouchTap={this.stopRecording} type="button">Stop</RaisedButton>
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
    saveImage: (data) => {
			dispatch(saveImage(data))
		},
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(VoiceRecorder);
