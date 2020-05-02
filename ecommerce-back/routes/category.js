const express = require('express');
const router = express.Router(); // Usou o módulo de Rótas

const { categoryById, create, read, update, deletar, list } = require('../controllers/category');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');

const { userById } = require('../controllers/user');

router.get('/category/:categoryId', read); // Ver Categoria Especifica
router.get('/categories', list); // Listar Categorias
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create); // Criar Categoria
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update); // Atualizar Categoria
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, deletar); // Deletar Categoria

router.param('categoryId', categoryById)
router.param('userId', userById);

module.exports = router;