import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductItem";

function RecommenderProduct({ product }) {
    const { products, setProducts } = useState([])
    useEffect(() => {
        const request_url = 'http://localhost:3000/api/bundle-recommendations';
        axios.post(request_url, {
            product_id: product.id,
            n_recommendations: 3
        })
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    })
    return (
        <div className='recommender'>
            <h2>Recommended for you</h2>
            <div className='product-grid'>
                {products.map((product, index) => (
                    <ProductCard product={product} key={index} />
                ))}
            </div>
        </div>
    );
}

export default RecommenderProduct;