import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import moment from 'moment';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents';
import applyUpdate from 'serviceworker-webpack-plugin/lib/browser/applyUpdate';

import App from './containers/App';

// Global / Default local for moment
moment.locale('fr');

if ('serviceWorker' in navigator) {
  const registration = runtime.register();
  registerEvents(registration, {
    onInstalled: () => {
      console.log('onInstalled');
      window.location.reload();
    },
    onUpdateReady: () => {
      console.log('onUpdateReady');
      applyUpdate();
    },
    onUpdating: () => {
      console.log('onUpdating');
    },
    onUpdateFailed: () => {
      console.log('onUpdateFailed');
    },
    onUpdated: () => {
      console.log('onUpdated');
      window.location.reload();
    },
  });
}

function renderWithHotReload (RootElement) {
  render(
    <AppContainer>
      <RootElement />
    </AppContainer>,
    document.getElementById('root'),
  );
}

renderWithHotReload(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const ReplaceContainer = require('./containers/App');
    renderWithHotReload(ReplaceContainer);
  });
}
