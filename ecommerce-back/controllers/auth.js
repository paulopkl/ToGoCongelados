const User = require('../models/user');
const jwt = require('jsonwebtoken'); // Para gerar token de registro
const expressJwt = require('express-jwt'); // Para verificar autenticação
const { errorHandler } = require('../helpers/dbErrorHandle');

const signup = (requisicao, resposta) => {
    // console.log("requisicao.body", requisicao.body);
    const user = new User(requisicao.body); // Pegamos da requisição
    
    // Save in the Database
    user.save((error, user) => {
        if (error) {
            return resposta.status(400).json({ error: errorHandler(error) });
        }
        user.sal = undefined;
        user.hashed_password = undefined;
        resposta.json({ user }); // user: user
    })
};

const signin = (req, res) => {
    // Procura o usuario baseado no email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'Usuario com esse email não existe. Por favor registre-se'
            })
        }

        // Se o usuário foi encontrado Certifique se o email e senha condizem
        // Criar método de autenticação no modelo de usuário
        if(!user.autenticar(password)) {
            return res.status(401).json({ error: 'Email e Senha não condizem' })
        }

        // Gerar um token de autenticação com o id do usuário e segredo
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // Persiste o token como 't' no cookie com data de expiração
        res.cookie('t', token, { expire: new Date() + 9999 });
        // Retorne resposta com o usuário e token para o client frontend
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    })
}

const signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Deslogado com success' });
}

const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
})

const isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
        if(!user) {
            return res.status(403).json({ error: 'Acesso Negado!!' });
        }
    next();
}

const isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({ error: 'Não é admin! Acesso Negado!!' });
    }
    next();
}


module.exports = { signup, signin, signout, requireSignin, isAuth, isAdmin }