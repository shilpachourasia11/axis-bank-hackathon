import React from 'react';
import { saveUserData, reset, verify } from "./../../actions/homeActions";
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { ReactMic } from 'react-mic';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Webcam from 'react-webcam';

class VoiceRecorder extends React.Component{
	constructor(props) {
		super(props);
		this.props = props;
    this.state = {
      record: false,
			value: 1,
			clipNumber: 1,
      image1: null,
			image2: null,
      key: 1
    }
	}

  startRecording = (recordedBlob) => {
    this.setState({
      record: true
    });
		this.capture();
  }

  stopRecording = () => {
    this.setState({
      record: false
    });
  }

	stream = (recordedBlob) => {
		this.convertClipFormat(recordedBlob);
	}

  onStop = (recordedBlob)  => {
		this.setState({
			recordedBlob
		});
		//this.convertClipFormat(recordedBlob);
  }

	convertClipFormat = (blob)=> {
		let reader = new FileReader();
		reader.readAsDataURL(blob.blob ? blob.blob : blob);
		var that = this;
		reader.onloadend = function() {
    	let base64data = reader.result;
			let userData = that.props.home.userData;
			userData['audioClip1'] = base64data;
			that.props.saveUserData(userData);
			that.props.verify(that.props.home.userData);
 		}
	}

	handleRequestClose = () => {
		this.props.reset();
	}

	handleChange = (event, index, value) => this.setState({value});

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

	render(){
		return (
      <div style={{backgroundColor: '#303030', paddingTop: '100px', paddingLeft: '100px', paddingRight: '100px'}}>
          <center>
            <ReactMic
              record={this.state.record}
              className="sound-wave"
              onStop={this.onStop}
							onData={this.stream}
              strokeColor="#000000"
              backgroundColor="#FF4081" />
            <br/>
            <RaisedButton onTouchTap={this.startRecording} type="button">Start</RaisedButton>
            {/* <RaisedButton onTouchTap={this.stopRecording} type="button">Stop</RaisedButton> */}
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
									this.state.value === 1 ?
									<p style={{color: 'white'}}>
										अपने जीवन के पहले भाग के दौरान, जब आप इसे खो देते हैं तो आप केवल खुशी के बारे में जागरूक हो जाते हैं। फिर एक उम्र आती है, एक दूसरा, जिसमें आप पहले ही जानते हैं, इस समय जब आप सच्ची खुशी का अनुभव करना शुरू करते हैं, तो आप दिन के अंत में इसे खोने जा रहे हैं। जब मैं बेले से मिला, तो मुझे समझ में आया कि मैंने अभी इस दूसरी उम्र में प्रवेश किया था। मुझे यह भी समझा गया कि मैं तीसरी उम्र तक नहीं पहुंचा था, जिसमें खुशी के नुकसान की प्रत्याशा आपको जीवित रहने से रोकती है।
									</p>
									:
									<p style={{color: 'white'}}>
										During the first part of your life, you only become aware of happiness once you have lost it. Then an age comes, a second one, in which you already know, at the moment when you begin to experience true happiness, that you are, at the end of the day, going to lose it. When I met Belle, I understood that I had just entered this second age. I also understood that I hadn’t reached the third age, in which anticipation of the loss of happiness prevents you from living.
									</p>
								}

						</div>
          </center>
        <Webcam
          style={{visibility: 'hidden'}}
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          ref = {
            (webcam) => {
              this.webcam = webcam;
            }
          }
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
    saveUserData: (data) => {
			dispatch(saveUserData(data))
		},
		reset: () => {
			dispatch(reset())
		},
		verify: (data) => {
			dispatch(verify(data))
		}
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(VoiceRecorder);
