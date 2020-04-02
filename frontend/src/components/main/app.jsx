import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './app.css';

import Nav from '../template/Nav/Nav';
import Footer from '../template/Footer/Footer';
import Logo from '../template/Logo/Logo';

import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';

const icones = {
    inicio: 'home',
    criar: 'database'
}

export default props =>
    <BrowserRouter>
        <div className="app">
            <Logo />
            <Nav {...icones} />
            <Routes />
            <Footer />
        </div>
    </BrowserRouter>