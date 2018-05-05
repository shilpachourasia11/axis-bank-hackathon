/* eslint new-cap: 0 */

import React from 'react';
import { Route } from 'react-router';

/* containers */
import { App } from './containers/App';
import { HomeContainer } from './containers/HomeContainer';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import NotFound from './components/NotFound';

export default (
    <Route path="/" component={App}>
        <Route path="home" component={ LoginView } />
        <Route path="register" component={ RegisterView } />
        <Route path="main" component={ LoginView } />
        <Route path="verify" component={ HomeContainer } />
        <Route path="*" component={NotFound} />
    </Route>
);
