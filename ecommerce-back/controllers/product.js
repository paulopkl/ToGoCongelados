const Formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandle');

const productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({ error: 'Produto não encontrado!!' });
        }
        req.product = product;
        next();
    })
}

const read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

const create = (req, res) => {
    let form = new Formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, campos, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Imagem não conseguiu fazer upload!!'
            })
        }

        // checar todos os campos
        const { name, description, price, category, quantity, shipping } = campos;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios!!" });;
        }

        let product = new Product(campos);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({ 
                    error: "Imagem deve ter menos de 1mb de tamanho" 
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                console.log('Erro: ' + err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(result);
        });
    });
}

const update = (req, res) => {
    let form = new Formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, campos, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Imagem não conseguiu fazer upload!!'
            })
        }

        // checar todos os campos
        const { name, description, price, category, quantity, shipping } = campos;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios!!" });;
        }

        let product = req.product;
        product = _.extend(product, campos)

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({ 
                    error: "Imagem deve ter menos de 1mb de tamanho" 
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                console.log('Erro: ' + err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(result);
        });
    });
}

const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(404).json({ error: errorHandler(err) });
        }
        res.json({ deletedProduct, "message": 'Produto deletado com sucesso!!' });
    })
}

/*
    Venda / Chegada
    por Venda = /product?sortBy=sold&order=desc&limit=4
    por Chegada = /product?sortBy=createdAt&order=desc&limit=4
    Se nenhum paramêtro forem enviados, então todos os produtos são retornados
*/
const list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, produtos) => {
            if (err) {
                return res.status(400).json({ error: 'Produtos não foram encontrados' });
            }
        res.json(produtos);
        })
}


/*
    [Descrição]
    isso vai procurar os produtos baseado na requisição de produto/categoria
    Outros produtos que tem a mesma categoria, vai ser retornado
*/
const listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, produtos) => {
            if (err) {
                return res.status(400).json({ error: 'Produtos não foram encontrados' });
            }
        res.json(produtos);
        })
}

const listCategories = (req, res) => {
    Product.distinct('category', {}, (err, categories) => {
        if (err) {
            return res.status(400).json({ error: 'Categorias não encontradas' });
        }
        res.json(categories);
    })
}

const listPorPesquisa = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id"; 
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    for (let key in req.body.filters) { // para cada CHAVE em corpo.filters
        if (req.body.filters[key].length > 0) { // Se a CHAVE dentro do Objeto filters tiver o tamanho 
        // maior que 0
            if (key === "price") { // Se a CHAVE for igual á "price"
                // gte -  maior que o preço  | 0-10 |
                // lte - menor que
                findArgs[key] = { 
                    $gte: req.body.filters[key][0], 
                    $lte: req.body.filters[key][1] 
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs) // Objeto {findArgs} 
        .select("-photo") // Selecione tudo menos photo
        .populate("category") // Referencia a tabela 'category'
        .sort([[sortBy, order]]) // Ordenar por, Default: [ Ordem Decrescente E Ordernar Por _id ]
        .skip(skip) //  Pular, Vem do corpo da requisição
        .limit(limit) // Limite de pesquisas, Default: 100
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({ error: "Produtos não encontrados!!" });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

const photo = (req, res, next) => {
    if(req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

const listPesquisa = (requisicao, resposta) => {
    // Criar um objeto query para procurar o valor e valor com categoria
    const query = {}
    // atribuir valor de pesquisa para query.search
    if (requisicao.query.search) { // Se na URL na requisição vier o search
        query.name = {$regex: requisicao.query.search, $options: 'i' }
        // Atribuir o valor da categoria para query.category
        if (requisicao.query.category && requisicao.query.category != 'All') { // Mudar o Valor "ALL"
            query.category = requisicao.query.category
        }
        // Procurar o produto baseado no objeto query com 2 propriedades
        // pesquisa e categoria
        Product.find(query, (err, products) => {
            if (err) {
                return resposta.status(400).json({ error: errorHandler(error) });
            } 
            resposta.json(products);
        }).select('-photo') 
    }
}

module.exports = { create, productById, read, remove, update, list, listRelated, listCategories, 
listPorPesquisa, photo, listPesquisa }
