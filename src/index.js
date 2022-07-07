import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Global from './components/ui/Global';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Global>
    <App />
  </Global>,
);
reportWebVitals();
