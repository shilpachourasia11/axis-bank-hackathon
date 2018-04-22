import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

/* application components */
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import Home from '../HomeContainer/index';
/* global styles for app */
import './styles/app.scss';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        children: React.PropTypes.node,
    };

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <section>
                    <Header />
                    <div  style={{height: '59%'}}>
                      <Home/>
                    </div>
                    {/* <div
                      className="container"
                      style={{ marginTop: 10, paddingBottom: 250 }}
                    >
                        {this.props.children}
                    </div>
                    <div>

                    </div> */}
                </section>
            </MuiThemeProvider>
        );
    }
}

export { App };
