const User = require('../models/user'); // Modelo do Banco de Dados

const userById = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({ error: 'Usuário não encontrado' })
        }

        req.profile = user;
        next(); // Vai para o próximo middleware
    });
}

const read = (req, res) => {
    req.profile.hashed_password = undefined; // Senha criptografada do perfil
    req.profile.salt = undefined; // SAL da criptografia da senha

    return res.json(req.profile); // Retorna um JSON com o perfil sem a senha e password 
}

const update = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile._id }, // ID igual ao ID passado na requisição
        { $set: req.body }, 
        { new: true }, 
        (err, user) => {
            if(err) {
                return res.status(400).json({ error: 'Você não permissão para fazer isso!!' })
            }
        user.hashed_password
        res.json(user)
        }
    )
}

module.exports = { userById, read, update };