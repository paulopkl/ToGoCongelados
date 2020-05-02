import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {

    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const produtosPorVenda = () => {
        getProducts('sold').then(dados => {
            if (dados.error) {
                setError(dados.error);
            } else {
                setProductsBySell(dados);
            }
        });
    };

    const produtosPorCriacao = () => {
        getProducts('createdAt').then(dados => {
            if (dados.error) {
                setError(dados.error);
            } else {
                setProductsByArrival(dados);
            }
        });
    };

    useEffect(() => {
        produtosPorCriacao();
        produtosPorVenda();
    }, []);

    return (
        <Layout title="Home Page" description="Node React E-commerce App" className="container">
            <Search />
            <h2 className="m-5">Novos</h2>
            <div className="row mx-3">
                {productsByArrival.map((produto, indice) => (
                    <div key={indice} className="col-sm-6 col-md-4 mb-5">
                        <Card product={produto} />
                    </div>
                ))}
            </div>

            <h2 className="m-5">Mais Vendidos</h2>
            <div className="row mx-3">
                {productsBySell.map((produto, indice) => (
                    <div key={indice} className="col-sm-6 col-md-4 mb-5">
                        <Card product={produto} />
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default Home;