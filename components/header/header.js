import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { push } from 'react-router-redux'
import store from '../../store'
import {Link} from 'react-router'
class Header extends React.Component {
  constructor(props) {
		super(props);
	}

   render() {
     return (
      <div>
        <AppBar
          title=""
        />
      </div>
      );
   }
}

export default Header;
