import React, { useState, useEffect } from 'react';

const Checkbox = ({ categories, filtrar }) => {
    const [checked, setCheked] = useState([]);

    const lidarComToggle = categoriaId => () => {
        // Retorna o primeiro indice ou -1
        const currentCategoryId = checked.indexOf(categoriaId);
        const newCheckedCategoryId = [...checked];
        // Se atualmente checkado já não foi checkado o estado > push()
        // Outro pull/take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(categoriaId);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        // console.log(newCheckedCategoryId);
        setCheked(newCheckedCategoryId);
        filtrar(newCheckedCategoryId);
    }

    return categories.map((categoria, indice) => (
        <li key={indice} className="list-unstyled">
            <input 
                type="checkbox" 
                onChange={lidarComToggle(categoria._id)} 
                className="form-check-input"
                value={checked.indexOf(categoria._id === -1)} 
            />
            <label className="form-check-label">{categoria.name}</label>
        </li>
    ));
}

export default Checkbox;