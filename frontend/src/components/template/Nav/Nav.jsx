import React from 'react';

import { Link } from 'react-router-dom';

import Hamburguer from '../../icons/Hamburguer';
import Caldo from '../../icons/Caldos';
import Gelo from '../../icons/Gelo';

import './Nav.css';

export default function Nav(props) {
    return(
        <aside className="menu-area">
            <nav className="menu">
                <Link to="/">
                    <i className={`fa fa-${props.inicio}`}></i> Inicio
                </Link>
                <Link to="/salgados">
                   <Hamburguer /> Salgados
                </Link>
                <Link to="/sorvetes">
                    <Gelo /> Sorvetes
                </Link>
                <Link to="/caldos">
                    <Caldo /> Caldos
                </Link>
                <Link to="/cardapios">
                    <i className={`fa fa-${props.criar}`}></i> Cadastre Produtos
                </Link>
            </nav>
        </aside>
    )
}