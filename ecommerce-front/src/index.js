import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './style.css';

require('dotenv').config();

ReactDOM.render(<Routes />, document.getElementById('root'));