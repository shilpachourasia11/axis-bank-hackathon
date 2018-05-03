/* eslint new-cap: 0 */

import React from 'react';
import { Route } from 'react-router';

/* containers */
import { App } from './containers/App';
import { HomeContainer } from './containers/HomeContainer';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import ProtectedView from './components/ProtectedView';
import Analytics from './components/Analytics';
import NotFound from './components/NotFound';

import home from './components/Home'

import { DetermineAuth } from './components/DetermineAuth';
import { requireAuthentication } from './components/AuthenticatedComponent';
import { requireNoAuthentication } from './components/notAuthenticatedComponent';

export default (
    <Route path="/" component={App}>
        <Route path="home" component={ LoginView } />
        <Route path="register" component={ RegisterView } />
        <Route path="main" component={ HomeContainer } />
        <Route path="verify" component={ HomeContainer } />
        <Route path="*" component={DetermineAuth(NotFound)} />
    </Route>
);
