import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/index';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { backgroundColor: '#ff9900' }
    } else {
        return { backgroundColor: 'rgba(0, 0, 0, 0)' }
    }
}

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
            </li>
            
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/shop')} to="/shop">Produtos</Link>
            </li>


            {/* Se está autenticado e tiver o role igual á 0, 'Não administrador'! */}
            {isAuthenticated() && isAuthenticated().user.role === 0 && ( 
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/user/dashboard')}
                        to="/user/dashboard">Painel de Controle</Link>
                </li>
            )}


            {/* Se está autenticado e tiver o role igual á 1, 'Administrador'! */}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/admin/dashboard')}
                        to="/admin/dashboard">Painel de Controle</Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Login</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Cadastrar-se</Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li className="nav-item">
                    <span className="nav-link" style={{ cursor: 'pointer', color: '#ffff' }} 
                    onClick={_ => signout(_ => history.push('/'))}>Sair</span>
                </li>
            )}
        </ul>
    </div>
)

export default withRouter(Menu);