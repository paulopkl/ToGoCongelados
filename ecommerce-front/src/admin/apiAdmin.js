import { API } from '../config';

const createCategory = (userId, token, category) => {
    // console.log(name, email, password);
    // API = |http://localhost:8000/api|
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST', // Métodos
        headers: { // Cabeçalhos
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category) // Converte o corpo da requisição de JSON para String
    }).then(response => {
        return response.json(); // converte a resposta  
    }).catch(err => {
        console.log(err);
    });
}

const createProduct = (userId, token, product) => {
    // console.log(name, email, password);
    // API = |http://localhost:8000/api|
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST', // Métodos
        headers: { // Cabeçalhos
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product // Converte o corpo da requisição de JSON para String
    }).then(response => {
        return response.json(); // converte a resposta  
    }).catch(err => {
        console.log(err);
    });
}

const signin = user => {
    return fetch(`${API}/signin`, {
        method: 'POST', // Métodos
        headers: { // Cabeçalhos
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user) // Converte o corpo da requisição de JSON para String
    }).then(response => {
        return response.json(); // converte a resposta  
    }).catch(erro => {
        console.log(erro);
    });
}

const authenticate = (dados, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem('jwt', JSON.stringify(dados));
        next();
    }
}

const signout = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`, {
            method: 'GET',
        })
            .then(resposta => {
                console.log('signout', resposta);
            })
            .catch(error => console.error(error))
    }
}

const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    } else {
        console.log(typeof window);
    }

    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false;
    }
}

const getCategories = () => {
    return fetch(`${API}/categories`, { method: 'GET' })
        .then(resposta => {
            return resposta.json(); // Transforma a Resposta em JSON
        }).catch(error => {
            console.error(error);
        });
}

export { createCategory, createProduct, signin, authenticate, signout, isAuthenticated, getCategories };