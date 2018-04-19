import React, {Component} from 'react';
import Home from './container/home'
import Header from './components/header/header'
var injectTapEventPlugin = require("react-tap-event-plugin");
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//injectTapEventPlugin();
class App extends Component {
  render() {
    return (
    <MuiThemeProvider>
      <div>
        <Header/>
        <Home/>

      
      </div>
    </MuiThemeProvider>
    );
  }
}
export default App;
