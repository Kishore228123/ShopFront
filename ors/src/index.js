
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import Routeit from './Routes';
import Profile from './Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routeit/>
      {/* <Profile/> */}
    </BrowserRouter>
  </React.StrictMode>
);