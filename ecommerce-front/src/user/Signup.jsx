import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth/index';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values

    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value,
        });
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false,  })
        signup({ name, email, password }) // Enviou um Objeto como user -arg
            .then(dados => {
                if (dados.error) {
                    setValues({ ...values, error: dados.error, success: false })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
            })
    }

    const signupForm = () => (
        <form>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input className="form-control" type="text" onChange={handleChange('name')}
                    value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">E-Mail</label>
                <input className="form-control" type="email" onChange={handleChange('email')}
                    value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Senha</label>
                <input className="form-control" type="password" onChange={handleChange('password')}
                    value={password} />
            </div>

            <button className="btn btn-primary" onClick={clickSubmit}>Cadastrar</button>

        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            { error }
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            Nova Conta criada. Por favor <Link to="/signin">Logar</Link> com a nova conta
        </div>
    )

    return (
        <Layout title="Signup" description="Signup to Node React E-commerce App" classe="container col-md-8">
            {showSuccess()}
            {showError()}
            {signupForm()}
        </Layout>
    )
}

export default Signup;