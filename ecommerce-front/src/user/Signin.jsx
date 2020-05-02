import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from '../auth/index';

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated()

    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value,
        });
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password }) // Enviou um Objeto como user -arg
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(data, () => {
                        setValues({ ...values, redirectToReferrer: true });
                    })
                }
            });
    }

    const signUpForm = () => (
        <form>
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
            <button className="btn btn-primary" onClick={clickSubmit}>Submit</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>
    )

    const showLoading = () => (
        loading && (
            <div className="alert alert-info">
                <h2>Carregando...</h2>
            </div>
        )
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            if(user && user.role === 1) { // Se o usuário for administrador
                return <Redirect to="/admin/dashboard" /> 
            } else { // Caso não seja administrador
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    return (
        <Layout title="Signin" description="Signin to Node React E-commerce App" classe="container col-md-8">
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    )
}

export default Signin;