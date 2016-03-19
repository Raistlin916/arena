import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react';
import { Provider } from 'react-redux';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import App from './containers/App';
import reducers from './reducers';


const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
)

const store = createStore(reducers, DevTools.instrument());

ReactDom.render(
  <Provider store={store}>
  	<div>
    	<App />
    	<DevTools />
    </div>
  </Provider>,
  document.getElementById('container')
)