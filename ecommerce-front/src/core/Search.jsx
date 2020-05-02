import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCategories, list } from './apiCore';
import Card from './Card';

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        result: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({
                    ...data,
                    categories: data
                })
            }
        })
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const searchData = () => {
        if (search) {
            list({ search: search || undefined, category: category }).then(response => {
                if (response.error) {
                    console.log(response.error);
                } else {
                    setData({ ...data, results: response, searched: true });
                }
            });
        };
    };

    const searchSubmit = (event) => {
        event.preventDefault();
        searchData();
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchedMessage = (searched, resultados) => {
        if (searched && resultados.length > 0) {
            return (
                <span className="alert alert-success">Encontrado {resultados.length} Produto(s)</span>
            );
        }

        if (searched && resultados.length < 1) {
            return (
                <span className="alert alert-danger m-4">Nenhum produto encontrado nesta categoria!</span>
            );
        }
    }

    const searchedProducts = (resultados = []) => (
        <div>
            <h2 className="my-4">
                {searchedMessage(searched, resultados)}
            </h2>
            <div className="row">
                {resultados.map((produto, indice) => (
                    <div key={indice} className="col-sm-6 col-md-4 mb-5">
                        <Card product={produto} />
                    </div>
                ))}
            </div>
        </div>
    );

    const searchForm = () => (
        <form onSubmit={searchSubmit} className="border border-secondary border-darken-4 px-2"
            style={{ borderRadius: '5px' }}>
            <span className="input-group-text pb-1">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn btn-dark p-2 active rounded"
                            onChange={handleChange('category')}>
                            <option value="All">Todas as Categorias</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <input type="search" className="form-control mx-3" onChange={handleChange('search')}
                        placeholder="Pesquisar por Titulo" />
                </div>
                <div className="btn input-group-append border border-info" style={{ borderRadius: '5px' }}>
                    <button className="input-group-text" style={{ cursor: 'pointer' }}>Pesquisar</button>
                </div>
            </span>
        </form>
    );

    return (
        <div className="row m-0">
            <div className="container my-1">
                {searchForm()}
            </div>
            <div className="container-fluid mb-3">
                {searchedProducts(results)}
            </div>
        </div>
    );
};

export default Search;