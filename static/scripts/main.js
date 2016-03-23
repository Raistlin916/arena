import { createDevTools, persistState } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react';
import { Provider } from 'react-redux';
import ReactDom from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import { App, Hall, Gate } from './containers';
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


const enhancer = compose(
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

const historyMiddleware = routerMiddleware(hashHistory)
const store = createStore(reducer, enhancer,
              applyMiddleware(thunk, historyMiddleware));
const history = syncHistoryWithStore(hashHistory, store);


ReactDom.render(
  <Provider store={store}>
  	<div>
    	<Router history={history}>
        <Route path="/" component={App}>
        	<IndexRoute component={Hall}/>
          <Route path="/gate" component={Gate}/>
        </Route>
      </Router>
    	<DevTools />
    </div>
  </Provider>,
  document.getElementById('container')
)