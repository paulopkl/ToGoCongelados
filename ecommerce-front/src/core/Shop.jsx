import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import Footer from './Footer';
import { prices } from './ValoresFixos.js';

const Shop = () => {
    const [myFilters, setMyFilters] = useState({ 
        filters: { 
            category: [], price: [] 
        } 
    });

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6); // Limite 6 produtos
    const [skip, setSkip] = useState(0); // Paginação: Pular '0' resultados
    const [size, setSize] = useState(0); // Tamanho: Pular '0' resultados
    const [filteredResults, setFilteredResults] = useState([]); // Paginação: Pular '0' resultados

    const init = () => {
        getCategories()
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setCategories(data);
                }
            });
    };

    const carregarResultadoFiltrado = newFilters => {
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
                console.error(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0)
            }
        });;;
    };

    const carregarMais = () => {
        let toSkip = skip + limit;

        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
                console.error(data.error);
            } else {
                setFilteredResults([ ...filteredResults, ...data.data ]);
                setSize(data.size);
                setSkip(toSkip);
            }
        })
    };

    const botaoCarregarMais = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={carregarMais} className="btn btn-warning active btn-block mb-5">Carregar Mais</button>  
            )
        )
    }

    useEffect(() => {
        init();
        carregarResultadoFiltrado(skip, limit, myFilters.filters);
    }, []);

    const filtrar = (filters, filterBy) => {
        console.log('SHOP', filters, filterBy);
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = Valor(filters);
            newFilters.filters[filterBy] = priceValues;
        }

        carregarResultadoFiltrado();
        setMyFilters(newFilters);   
    };

    const Valor = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }

        return array;
    };

    return (
        <Layout title="Pagina de Produtos" description="Confira nossos produtos!" className="container">
            <div className="row m-0">
                <div className="col-3">
                    <h4>Filtrar por categoria</h4>
                    <ul>
                        <Checkbox categories={categories} filtrar={filters => filtrar(filters, 'category')} />
                    </ul>

                    <h4>Filtrar por valores</h4>
                    <div>
                        <RadioBox prices={prices} filtrar={filters => filtrar(filters, 'price')} />
                    </div>
                </div>
                <div className="col-9">
                    <h2 className="mb-4">Produtos</h2>
                    <div className="row">
                        {filteredResults.map((product, indice) => (
                                <Card key={indice} product={product} />
                        ))}
                    </div>
                    <hr/>
                    {botaoCarregarMais()}
                </div>
            </div>
        </Layout>
    )
};

export default Shop;