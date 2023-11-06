import React from 'react'
import App from './App.jsx'
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { BrowserRouter } from "react-router-dom";
import { createRoot }from 'react-dom/client';

const rootElement = document.getElementById( 'root' );
const root = createRoot( rootElement );

root.render(
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);