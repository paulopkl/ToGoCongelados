const express = require('express');
const router = express.Router(); // Usou o módulo de Rótas

const { create, productById, read, remove, update, list, listRelated, listCategories, listPorPesquisa, photo
, listPesquisa } = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update);

router.get('/products', list);
router.get('/products/search', listPesquisa);
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);

/* 
   listando produtos por pesquisa
   nós vamos implementar pesquisa de produtos no react frontend
   nós vamos mostrar categorias no checkbox e raio de valores nos radio-buttons
   quando o usuário clica naqueles checkbox e radio buttons
   nós vamos fazer uma requisição á api e mostrar os produtos para o usuario baseado no que ele quer
 */

router.post('/products/by/search', listPorPesquisa);
router.get('/product/photo/:productId', photo);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;