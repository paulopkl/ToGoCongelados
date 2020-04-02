import React, { Component } from 'react';
import Main from '../template/Main/Main';
import CaldoIcon from '../icons/Caldos';

const headerPropriedades = {
    iconPrefix: "fa fa-", 
    iconSufix: "home",
    title: "inicio",
    subtitle: "Experimente os melhores caldos da região!!!"
}

export default class Caldos extends Component { 
    render() {
        return(
            <Main {...headerPropriedades}>
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Melhores caldos!</h4>
                    <p>Confira nossos produtos.</p>
                </div>
                <hr />
            </Main>
        )
    }
}