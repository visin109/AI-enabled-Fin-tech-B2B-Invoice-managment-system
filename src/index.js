import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyGrid from './components/MyGrid';
import {data} from './services/data';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <MyGrid/>
  </React.StrictMode>,
  document.getElementById('root')
);

