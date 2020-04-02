import React, { Component } from 'react';
import axios from 'axios';
import Main from '../template/Main/Main';

import Feijoada from '../../assets/imgs/Feijoada.jpeg'
import Card from '../template/card/Card';

const headerPropriedades = {
    iconPrefix: 'fa fa-',
    iconSufix: 'database',
    title: 'Produtos',
    subtitle: 'Cadastro de Produtos: Insera novos produtos abaixo.'
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

export default class Cardapio extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseURL).then(respo => {
            this.setState({ list: respo.data });
        })
    }

    clear() {
        this.setState(
            { cardapio: initialState.cardapio }
        )
    }

    save() {
        const cardapio = this.state.cardapio;
        const method = cardapio.id ? 'put' : 'post';
        const url = cardapio.id ? `${baseURL}/${cardapio.id}` : baseURL;
        axios.put('http://localhost:3001/cardapios')
        axios[method](url, cardapio).then(resp => {
            const list = this.getUpdatedList(resp.data);
            this.setState({ cardapio: initialState.cardapio, list })
        })
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

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Produto:</label>
                            <input type="text" className="form-control" name="produto" placeholder="Insira o Produto"
                                value={this.state.cardapio.produto} onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Descrição:</label>
                            <input type="text" className="form-control" name="descricao"
                                value={this.state.cardapio.descricao} placeholder="Insira a Descrição" onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Valor:</label>
                            <input type="text" className="form-control" name="valor"
                                value={this.state.cardapio.valor} placeholder="Insira o Valor" onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Insira a Imagem:</label>
                            <input type="text" className="form-control" name="imagem"
                                value={this.state.cardapio.imagem} placeholder="Insira a Imagem" onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 col-md-6 d-flex justify-content-start">
                        <button className="btn text-light" style={{ backgroundColor: '#4adb6e' }} onClick={e => this.save(e)}>Salvar</button>
                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>Cancelar</button>
                    </div>
                </div>
                <hr />
            </div>
        )
    }

    load(cardapio) {
        this.setState({ cardapio });
    }

    remove(cardapio) {
        axios.delete(`${baseURL}/${cardapio.id}`).then(resp => {
            const list = this.getUpdatedList(cardapio, false);
            this.setState({ list });
        })
    }

    renderCards() {
        return (this.state.list.map(cardapio => {
            return (
                <div className="col mb-4" key={cardapio.id}>
                    <Card imagem={Feijoada} produto={cardapio.produto} descricao={cardapio.descricao}
                        valor={cardapio.valor}>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-warning" onClick={() => this.load(cardapio)}>
                                <i className="fa fa-pencil"></i>
                            </button>
                            <button className="btn btn-danger ml-2" onClick={() => this.remove(cardapio)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    </Card>
                </div>
            )
        }))
    }

    render() {
        console.log(this.state.list);
        return (
            <Main {...headerPropriedades}>
                {this.renderForm()}
                <div className="row row-cols-1 row-cols-md-3" >
                    {this.renderCards()}
                </div>
            </Main>
        )
    }
}