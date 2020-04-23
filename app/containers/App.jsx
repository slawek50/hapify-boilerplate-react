import React from 'react';
import { Provider } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.min.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-sweet-progress/lib/style.css';
import 'antd/dist/antd.css';

import configureStore from '../store/configureStore';

import Router from './Router';

// import '../../assets/stylesheets/app.scss';

// Import Favicons directory
// import '../../assets/favicons/android-chrome-144x144.png';
// import '../../assets/favicons/android-chrome-192x192.png';
// import '../../assets/favicons/android-chrome-256x256.png';
// import '../../assets/favicons/apple-touch-icon.png';
// import '../../assets/favicons/browserconfig.xml';
// import '../../assets/favicons/favicon-16x16.png';
// import '../../assets/favicons/favicon-32x32.png';
// import '../../assets/favicons/favicon.ico';
import '../../assets/favicons/site.webmanifest';
// import '../../assets/favicons/mstile-150x150.png';
// import '../../assets/favicons/safari-pinned-tab.svg';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
