import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const { user: { _id, name, email, role } } = isAuthenticated();

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Links do Usuario</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">Meu Carrinho</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/profile/update">Atualizar Perfil</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Informação do usuário</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 1 ? 'Admin' : 'Usuário Registrado'}</li>
                </ul>
            </div>
        );
    };

    const historicoCompra = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Histórico de compra</h3>
                <ul className="list-group">
                    <li className="list-group-item">history</li>
                </ul>
            </div>
        );
    }

    return (
        <Layout title="Painel de Controle do usuário" description={`Bem vindo ${name}!`}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        {userLinks()}
                    </div>

                    <div className="col-9">
                        {userInfo()}
                        {historicoCompra()}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;