import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react';
import { Provider } from 'react-redux';
import ReactDom from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import { App, Hall } from './components';
import * as reducers from './reducers';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});


const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
)

const store = createStore(reducer, DevTools.instrument());
const history = syncHistoryWithStore(browserHistory, store);


ReactDom.render(
  <Provider store={store}>
  	<div>
    	<Router history={history}>
        <Route path="/" component={App}>
        	<IndexRoute component={Hall}/>
        </Route>
      </Router>
    	<DevTools />
    </div>
  </Provider>,
  document.getElementById('container')
)