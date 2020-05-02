import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    // Carregar categorias e setar formulario de dados
    const init = () => {
        getCategories()
            .then(dados => {
                if (dados.error) {
                    setValues({ ...values, error: dados.error })
                } else {
                    setValues({ ...values, categories: dados, formData: new FormData() })
                }
            });
    };

    // Desestruturou
    const { user, token } = isAuthenticated();

    useEffect(() => {
        init();
    }, []);

    const lidarComMudanca = (name) => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const clickSubmit = (evento) => {
        evento.preventDefault();
        setValues({ ...values, error: '', loading: true });
        createProduct(user._id, token, formData)
            .then(dados => {
                if (dados.error) {
                    setValues({ ...values, error: dados.error });
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        photo: '',
                        price: '',
                        quantity: '',
                        loading: false,
                        createdProduct: dados.name
                    })
                }
            })
    }

    const novaPostagemForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Publicar Foto!</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={lidarComMudanca('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Nome: </label>
                <input onChange={lidarComMudanca('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Descrição: </label>
                <textarea onChange={lidarComMudanca('description')} type="text" className="form-control"
                    value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Preço: </label>
                <input onChange={lidarComMudanca('price')} type="text" className="form-control"
                    value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Categoria: </label>
                <select onChange={lidarComMudanca('category')} className="form-control">
                    <option>Selecione</option>
                    {categories && categories.map((c, i) => (
                            <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Produto para entrega?</label>
                <select onChange={lidarComMudanca('shipping')} className="form-control">
                    <option>Selecione</option>
                    <option value="0">Não</option>
                    <option value="1">Sim</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantidade: </label>
                <input onChange={lidarComMudanca('quantity')} type="number" className="form-control"
                    value={quantity} />
            </div>

            <button className="btn btn-outline-primary">Criar Produto!</button>
        </form>
    )

    const voltar = () => {
        return (
            <div className="my-5">
                <Link to="/admin/dashboard" className="btn btn-outline text-warning">
                    Voltar para Dashboard!
                </Link>
            </div>
        )
    }

    const mostraErro = () => (
        <div className="alert alert-danger" style={{ display: (error ? '' : 'none') }}>
            {error}
        </div>
    );

    const mostraSucesso = () => (
        <div className="alert alert-success" style={{ display: (createdProduct ? '' : 'none') }}>
            <h2>{`${createdProduct}`} Foi criado com sucesso!</h2>
        </div>
    );
    
    const mostraCarregamento = () => (
        loading && (
            <div className="alert alert-secondary">
                <h2>Carregando...</h2>
            </div>  
        )
    );

    return (
        <Layout title="Adicionar um novo produto"
            description={`Bem vindo ${user.name}! quer adicionar uma nova categoria?`}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        {novaPostagemForm()}
                        {mostraErro()}
                        {mostraSucesso()}
                        {mostraCarregamento()}
                        {voltar()}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export { AddProduct };