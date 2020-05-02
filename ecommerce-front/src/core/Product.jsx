import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import { read } from './apiCore';


const Product = (props) => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);

    const CarregarProdutoUnico = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        CarregarProdutoUnico(productId);
    }, []);

    return (
        <Layout title={product && product.name} description={product &&
            product.description && product.description.substring(0, 100)} className="container">
            <h2 className="mb-4">
                {product.name}
            </h2>
            <div className="row m-0">
                {product && product.description && <Card product={product} mostrarBotao={false} />}
            </div>

        </Layout>
    );
}

export default Product;