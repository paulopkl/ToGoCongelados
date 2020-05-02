const express = require('express');
const router = express.Router(); // Usou o módulo de Rótas

const { signup, signin, signout, requireSignin } = require('../controllers/auth');
const { userSignupValidator } = require('../validator');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.get('/hello', (req, res) => {
        res.send('<h1>Hello there</h1>');
});

module.exports = router;