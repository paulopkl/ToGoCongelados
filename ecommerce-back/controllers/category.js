const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandle');

const categoryById = (req, res, next, id) => {
    Category
        .findById(id)
        .exec((err, category) => {
        if(err || !category) {
            return res.status(400).json({ error: 'Categoria não existe!!' })
        }
        req.category = category
        next();
    });
}

function create(req, res) {
    const category = new Category(req.body);

    category.save((err, data) => {
        if (err) {
            return res.status(400).json({ error: errorHandler(err) })
        }
        res.json({ data })
    })
}

const read = (req, res) => {
    return res.json(req.category);
}

const update = (req, res) => {
    const category = req.category;
    
    category.name = req.body.name;
    
    category.save((err, dados) => {
        if (err) { // Se der erro
            return res.status(400).json({ error: errorHandler(err) });
        }
    res.json(dados);
    });
}

const deletar = (req, res) => {
    const category = req.category;
    category.remove((err, dados) => {
        if (err) { // Se der erro
            return res.status(400).json({ error: errorHandler(err) })
        }
    res.json({ dados, 'message': 'Categoria deletada!!' });
    // res.json({ message: 'Categoria deletada!!' });
    })
}

const list = (req, res) => {
    Category.find().exec((err, dados) => {
        if (err) { // Se der erro
            return res.status(400).json({ error: errorHandler(err) });
        }
    res.json(dados);
    });

}


module.exports = { create, read, update, deletar, list, categoryById }