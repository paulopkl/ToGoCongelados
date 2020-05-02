import { API } from '../config';

const signup = user => {
    // console.log(name, email, password);
    // API = |http://localhost:8000/api|
    return fetch(`${API}/signup`, {
        method: 'POST', // Métodos
        headers: { // Cabeçalhos
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user) // Converte o corpo da requisição de JSON para String
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

export { signin, signup, signout, authenticate, isAuthenticated };