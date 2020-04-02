import React, { Component } from 'react';
import Main from '../template/Main/Main';
import axios from 'axios';

import Feijoada from '../../assets/imgs/Feijoada.jpeg'
import Card from '../template/card/Card';

const headerPropriedades = {
    iconPrefix: "fa fa-", 
    iconSufix: "home",
    title: "inicio",
    subtitle: "Compre os melhores Alimentos da região!!!"
}

const baseURL = 'http://localhost:3001/cardapios';
const initialState = {
    cardapio: {
        "produto": "",
        "descricao": "",
        "valor": 0,
        "imagem": ""
    },
    list: []
}

export default class Home extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseURL).then(respo => {
            this.setState({ list: respo.data });
        })
    }

    load(cardapio) {
        this.setState({ cardapio });
    }

    getUpdatedList(cardapio, add = true) {
        const list = this.state.list.filter(u => u.id !== cardapio.id);
        if (add) list.unshift(cardapio); /* Adiciona um usuário na 1ª Posição da lista */
        return list
    }

    updateField(event) {
        const cardapio = { ...this.state.cardapio }
        cardapio[event.target.name] = event.target.value; // Atributo do target.name é igual ao valor dele
        this.setState({ cardapio })
    }

    renderList() {
        return (this.state.list.map(cardapio => {
            return (
                <div className="col mb-4" key={cardapio.id}>
                    <Card imagem={Feijoada} produto={cardapio.produto} 
                    descricao={cardapio.descricao} valor={cardapio.valor} />
                </div>
            )
        }))
    }

    render() {
        return (
            <Main {...headerPropriedades}>
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Bem vindo!</h4>
                    <p>Somos a To Go, uma franquia do ramo alimentício, compre nossos melhores produtos.</p>
                </div>
                <hr />
                <div className="row row-cols-1 row-cols-md-3">
                    {this.renderList()}
                </div>
            </Main>
        )
    }
}