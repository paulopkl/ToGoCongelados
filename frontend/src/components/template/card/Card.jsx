import React from 'react';

export default props => 
    <div className="card click">
        <img src={props.imagem} className="card-img-top feijoada" alt={props.imagem} />
        <div className="card-body">
            <h5 className="card-title">{props.produto}</h5>
            <p>{props.descricao}</p>
            <span className="text-muted">Apenas: </span>
            <h2 className="card-text text-success">
                {props.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            </h2>
            {props.children}
        </div>
    </div>
