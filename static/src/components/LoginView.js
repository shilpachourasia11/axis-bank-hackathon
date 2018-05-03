/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { browserHistory } from 'react-router';

const style = {
    marginTop: 50,
    paddingBottom: 50,
    marginLeft: '25%',
    paddingTop: 25,
    width: '50%',
    textAlign: 'center',
    display: 'inline-block'
};

const homeStyle = {
  background: "url('https://i.ytimg.com/vi/SmO5wKFZnmk/maxresdefault.jpg')",
  height: '100%'
}

export default class LoginView extends React.Component {

    constructor(props) {
        super(props);
        const redirectRoute = '/login';
        this.state = {
            email: '',
            password: '',
            email_error_text: null,
            password_error_text: null,
            redirectTo: redirectRoute,
            disabled: true,
        };
    }

    dispatchNewRoute(route) {
      browserHistory.push(route);
      this.setState({
          open: false,
      });
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3" style={homeStyle}>
                <Paper style={style}>
                    <form role="form">
                        <div className="text-center">
                            <h2>Face Voice Recognition</h2>
                            <RaisedButton
                              style={{ marginTop: 50 }}
                              label="Register Details"
                              onClick={() => this.dispatchNewRoute('/register')}
                            />

                            <RaisedButton
                              style={{ marginTop: 50, marginLeft: 15 }}
                              label="Verification"
                              onClick={() => this.dispatchNewRoute('/verify')}
                            />
                        </div>
                    </form>
                </Paper>

            </div>
        );

    }
}

LoginView.propTypes = {
    loginUser: React.PropTypes.func,
    statusText: React.PropTypes.string,
};
