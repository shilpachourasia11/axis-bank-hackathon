import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import LeftNav from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import * as actionCreators from '../../actions/auth';
import './Header.scss';

export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };

    }

    dispatchNewRoute(route) {
      this.props.resetUserData({})
      browserHistory.push(route);
      this.setState({
          open: false,
      });
    }

    openNav() {
        this.setState({
            open: true,
        });
    }

    render() {
        return (
            <header>
                {/* <LeftNav open={this.state.open}>
                    {
                            <div>
                                <MenuItem onClick={() => this.dispatchNewRoute('/verify')}>
                                    Verification
                                </MenuItem>
                                <MenuItem onClick={() => this.dispatchNewRoute('/register')}>
                                    Register
                                </MenuItem>
                            </div>

                    }
                </LeftNav> */}
                <AppBar
                  showMenuIconButton={false}
                  title="User Authentication"
                  iconElementRight={<FlatButton label="Home" style={{color: '#fff'}} onClick={() => this.dispatchNewRoute('/home')}/>}

                  // onLeftIconButtonTouchTap={() => this.openNav()}
                />
            </header>

        );
    }
}

Header.propTypes = {
    logoutAndRedirect: React.PropTypes.func,
    isAuthenticated: React.PropTypes.bool,
};
