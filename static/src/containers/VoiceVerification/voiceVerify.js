import React from 'react';
import { saveUserData, reset } from "./../../actions/homeActions";
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { ReactMic } from 'react-mic';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class VoiceRecorder extends React.Component{
	constructor(props) {
		super(props);
		this.props = props;
    this.state = {
      record: false,
			value: 1,
			clipNumber: 1
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

  onData = (recordedBlob) => {
		this.setState({
			recordedBlob
		});
  }

  onStop = (recordedBlob)  => {
		this.setState({
			recordedBlob
		});
		this.convertClipFormat(recordedBlob);
  }

	convertClipFormat = (blob)=> {
		let reader = new FileReader();
		reader.readAsDataURL(blob.blob);
		var that = this;
		reader.onloadend = function() {
			let clipNumber = that.state.clipNumber;
    	let base64data = reader.result;
			let userData = that.props.home.userData;
			userData['audioClip' + clipNumber] = base64data;
			that.props.saveUserData(userData);
			that.setState({
				clipNumber: (clipNumber+1)
			});
 		}
	}

	handleRequestClose = () => {
		this.props.reset();
	}

	handleChange = (event, index, value) => this.setState({value});

	render(){
		return (
      <div style={{backgroundColor: '#303030'}}>
        <Paper zDepth={2} style={{height: '100%', paddingTop: '100px', paddingLeft: '100px', paddingRight: '100px'}}>
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
						<div>
							<br/><label>Please read the following text for audio clip</label><br/>
							<SelectField
								value={this.state.value}
								onChange={this.handleChange}
								>
									<MenuItem value={1} primaryText="Hindi" />
									<MenuItem value={2} primaryText="English" />
								</SelectField>
								{
									this.state.value === 1 ?
									<p>
										यदि आप दोस्तों की तलाश में जाते हैं, तो आप पाएंगे कि वे बहुत दुर्लभ हैं। यदि आप एक दोस्त बनने के लिए बाहर जाते हैं, तो आप उन्हें हर जगह पाएंगे।
									</p>
									:
									<p>
										If you go out looking for friends, you're going to find they are very scarce. If you go out to be a friend, you'll find them everywhere.
									</p>
								}

						</div>
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
		reset: () => {
			dispatch(reset())
		},
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(VoiceRecorder);
