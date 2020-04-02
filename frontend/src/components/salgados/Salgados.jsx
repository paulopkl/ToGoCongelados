import React, { Component } from 'react';
import Main from '../template/Main/Main';

const headerPropriedades = {
    iconPrefix: "fa fa-", 
    iconSufix: "home",
    title: "inicio",
    subtitle: "Experimente nossos Salgados!!!"
}

export default class Salgados extends Component { 
    render() {
        return (
            <Main {...headerPropriedades}>
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Salgados!</h4>
                    <p>Confira nossos produtos.</p>
                </div>
                <hr />
            </Main>
        )
    }
}