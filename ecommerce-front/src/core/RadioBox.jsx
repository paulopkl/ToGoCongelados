import React, { useState, useEffect, Fragment } from 'react';

const RadioBox = ({ prices, filtrar }) => {
    const [value, setValue] = useState(0);
    
    const lidarComMudanca = event => {
        filtrar(event.target.value);
        setValue(event.target.value);
    }

    return prices.map((val, indice) => (
        <div key={indice}>
            <input type="radio" onChange={lidarComMudanca} className="mr-2 ml-4" value={`${val._id}`}
            name={val} />
            <label className="form-check-label">{val.name}</label>
        </div>
    ));
}

export default RadioBox;