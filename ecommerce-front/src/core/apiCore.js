import { API } from '../config';
import queryString from 'query-string';

const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, { method: 'GET' })
        .then(resposta => {
            return resposta.json(); // Transforma a Resposta em JSON
        }).catch(error => {
            console.error(error);
        });
};

const getCategories = () => {
    return fetch(`${API}/categories`, { method: 'GET' })
        .then(resposta => {
            return resposta.json(); // Transforma a Resposta em JSON
        }).catch(error => {
            console.error(error);
        });
};

const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit, skip, filters
    }

    return fetch(`${API}/products/by/search`, {
        method: 'POST', // Métodos
        headers: { // Cabeçalhos
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Converte o corpo da requisição de JSON para String
    }).then(response => {
        return response.json(); // converte a resposta  
    }).catch(err => {
        console.log(err);
    });
};

const list = params => {
    const query = queryString.stringify(params);
    console.log('query ', query);
    return fetch(`${API}/products/search?${query}`, { method: 'GET' })
        .then(resposta => {
            return resposta.json(); // Transforma a Resposta em JSON
        }).catch(error => {
            console.error(error);
        });
};

const read = productId => {
    return fetch(`${API}/product/${productId}`, { method: 'GET' })
        .then(resposta => {
            return resposta.json(); // Transforma a Resposta em JSON
        }).catch(error => {
            console.error(error);
        });
};

export { getProducts, getCategories, getFilteredProducts, list, read };