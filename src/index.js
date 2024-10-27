import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import HurricaneTracker from './pages/HurricaneTracker';
import Map from './pages/Map';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Map/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// <HurricaneTracker lat="29.6516" lon="-82.3248" area="FL" />,
