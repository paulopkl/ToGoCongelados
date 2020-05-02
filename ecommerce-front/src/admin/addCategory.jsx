import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    
    // Desestruturador usuário e token de localStorage
    const {user, token} = isAuthenticated();

    const LidarComMudancas = (evento) => {
        setError('');
        setName(evento.target.value);
    }

    const clickSubmit = (evento) => {
        evento.preventDefault();
        setError('');
        setSuccess(false);
        // Faz uma requisição á api para criar uma categoria
        createCategory(user._id, token, {name})
        .then(dados => {
            if (dados.error) {
                setError('erro');
                setSuccess(false);
            } else {
                setError('');
                setSuccess(true);
            }
            console.log(error);
            console.log(success);
        })
    }

    const novaCategoria = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={LidarComMudancas} value={name} 
                    autoFocus required />
            </div>
            <button className="btn btn-outline-primary">Criar Categoria</button>
        </form>
    );

    const mostrarSucesso = () => {
        if (success) {
            return <h3 className="text-success">Categoria criada com sucesso!</h3>
        }
    }

    const mostrarErro = () => {
        if (error) {
            return <h3 className="text-danger">Categoria já existe!</h3>
        }
    }

    const voltar = () => {
        return (
            <div className="mt-5">
                <Link to="/admin/dashboard" className="btn btn-outline text-warning">Voltar para Dashboard!</Link>
            </div>
        )
    }

    return (
        <Layout title="Adicionar categoria" description={`Bem vindo ${user.name}! quer adicionar uma nova categoria?`}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        {mostrarSucesso()}
                        {mostrarErro()}
                        {novaCategoria()}
                        {voltar()}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory;