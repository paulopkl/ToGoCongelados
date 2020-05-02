import React from 'react';
import { Link } from 'react-router-dom';
import MostraImagem from './MostraImagem';
import './Card.css'

const Card = ({ product, mostrarBotao = true }) => {

    const showViewButton = mostrarbtn => {
        return (
            mostrarbtn && (
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn-primary my-1 btn-sm active">Ver Produto</button>
                </Link>
            )
        )
    }

    return (
        <div className="card">
            <h3 className="card-header text-center">{product.name}</h3>
            <div className="card-body">
                <MostraImagem item={product} url="product" />
                <p>{product.description.substring(0, 100)}</p>
                <p>Apenas: R$ {(product.price).toLocaleString('pt-BR')}</p>
                <div className="d-flex justify-content-between">
                        {showViewButton(mostrarBotao)}
                    <Link to="/">
                        <button className="btn btn-warning my-2 btn-sm active">Adicionar ao carrinho</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card;