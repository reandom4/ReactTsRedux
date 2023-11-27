import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Router from "./screen/ui/Router";
import { Provider } from 'react-redux';
import { store } from './store/store';
import {ThemeProvider} from './screen/ThemeContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </Provider> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reptWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
