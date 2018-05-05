import React from 'react';
import { saveUserData, reset } from "./../../actions/homeActions";
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { ReactMic } from 'react-mic';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

class VoiceRecorder extends React.Component{
	constructor(props) {
		super(props);
		this.props = props;
    this.state = {
      record: false,
			value: 2,
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

	getText = (clip) => {
		let type = this.state.value;
		if(clip === 1){
			if(type === 1){
				return (
					<p>
						डॉन को पकड़ना मुश्किल ही नहीं, नामुमकिन है.
					</p>
				)
			}
			else{
				return (
					<p>
						Because he's the hero Gotham deserves, but not the one it needs right now.
					</p>
				)
			}
		}
		else if(clip === 2){
			if(type === 1){
				return (
					<p>
						आज मेरे पास बंगला है, गाडी है, बैंक बैलेंस है, क्या है तुम्हारे पास?
					</p>
				)
			}
			else{
				return (
					<p>
						As you know, madness is like gravity...all it takes is a little push.
					</p>
				)
			}
		}
		else{
			if(type === 1){
				return (
					<p>
						रिश्ते में तोह हम तुम्हारे बाप लगते हैं, नाम है शहंशाह.
					</p>
				)
			}
			else{
				return (
					<p>
						You think my name's funny do you? No need to tell me who you are. Red hair and a hand-me-down robe? You must be a Weasley.
					</p>
				)
			}
		}
	}

	render(){
		let div_height = 'calc(100vh - 184px)';
		if (this.props.type !== 'register'){
			div_height = 'calc(100vh - 112px)';
		}
		return (
      <div style={{ backgroundColor: '#303030', height: div_height }}>
				{
					this.props.type === 'register' ?
					<Stepper activeStep={this.state.clipNumber-1}>
						<Step>
							<StepLabel style={{color: 'white'}}>Recording clip 1</StepLabel>
						</Step>
						<Step>
							<StepLabel style={{color: 'white'}}>Recording clip 2</StepLabel>
						</Step>
						<Step>
							<StepLabel style={{color: 'white'}}>Recording clip 3</StepLabel>
						</Step>
					</Stepper>
					: null
				}

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
							<br/>
              {
                this.state.value === 1 ?
                <label style={{color: 'white'}}>कृपया ऑडियो क्लिप के लिए निम्न पाठ पढ़ें</label>
                :
                <label style={{color: 'white'}}>Please read the following text for audio clip</label>
              }
              <br/>
							<SelectField
								value={this.state.value}
								onChange={this.handleChange}
								>
									<MenuItem value={1} primaryText="Hindi" />
									<MenuItem value={2} primaryText="English" />
								</SelectField>
								{

									this.props.type === 'register' ?
									this.getText(this.state.clipNumber)
									:
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
