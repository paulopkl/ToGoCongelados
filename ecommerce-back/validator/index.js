exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Nome é requerido!!').notEmpty();
    req.check('email', 'Email deve estar entre 3 a 32 caracteres')
        .matches(/.+\@.+\..+/)
        .withMessage('Email deve conter @')
        .isLength({ min: 4, max: 32 })
    req.check('password', 'Senha é requerida').notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('Senha deve conter no minimo 6 caracteres')
        .matches(/\d/)
        .withMessage('Senha deve conter um numero');
    
    const errors = req.validationErrors();
    
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({ error: firstError })
    }

    next();

}