import React from 'react';
import { API } from '../config';

const MostraImagem = (props) => { // Este componente tem propriedades sendo pegadas

    const Estilo = {
        maxHeight: '100%',
        maxWidth: '100%'
    }

    return (
        <div className="product-img">
            <img src={`${API}/${props.url}/photo/${props.item._id}`} alt={props.item.name} className="mb-3"
            style={Estilo}  />
        </div>
    )
}

export default MostraImagem;