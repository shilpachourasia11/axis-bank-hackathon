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
			value: 1
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
    	let base64data = reader.result;
			let userData = that.props.home.userData;
			userData['audioClip'] = base64data;
			that.props.saveUserData(userData);
 		}
	}

	handleRequestClose = () => {
		this.props.reset();
	}

	handleChange = (event, index, value) => this.setState({value});

	render(){
		return (
      <div style={{backgroundColor: 'black'}}>
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
						{
							this.props.type === 'register' ?
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
													हम, भारत के लोग …..संविधान को अंगीकृत, अधिनियमित तथा आत्मार्पित करते हैं.
													इससे यह निष्कर्ष निकलता है कि संविधान का निर्माण भारतीय जनता के द्वारा किया है. इस प्रकार भारत की जनता ही समस्त राजनीतिक सत्ता का स्रोत है. यह सच है कि समस्त भारतीय जनता ने इसका निर्माण नहीं किया है, फिर भी यह एक सच्चाई है कि इसके निर्माता जनता के प्रतिनिधि थे. इन प्रतिनिधियों ने यह स्वीकार किया कि सम्पूर्ण राज्यशक्ति का मूल स्रोत भारतीय जनता में निहित है. 1950 ई. में "गोपालन बनाम मद्रास राज्य" नामक मुक़दमे में सर्वोच्च न्यायालय ने इसी आशय का निर्णय दिया और इसमें स्पष्ट किया कि भारतीय जनता ने अपनी सर्वोच्च इच्छा को व्यक्त करते हुए लोकतंत्रात्मक आदर्श अपनाया है.
												</p>
												:
												<p>
												WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens
												JUSTICE, social, economic and political;
												LIBERTY of thought, expression, belief, faith and worship;
												EQUALITY of status and of opportunity; and to promote among them all
												FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation;
												IN OUR CONSTITUENT ASSEMBLY this 26th day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION
												</p>
											}

									</div>
							: null
						}
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
