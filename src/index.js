import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import UIProvider from './context/UIContext';
import { setUpInterceptor } from './axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <UIProvider>
        <Router>
          <App />
        </Router>
      </UIProvider>
    </Provider>
  </StrictMode>
);
setUpInterceptor(store);
reportWebVitals();
