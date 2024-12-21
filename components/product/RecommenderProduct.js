import React, { useEffect, useState } from "react";
import axios from "axios";
import RecommenderProductCard from "./RecommenderProductItem";

function RecommenderProduct({ product }) {
    const [ products, setProducts ] = useState([])
    useEffect(() => {
        console.log(product.productID);
        const request_url = 'https://lthstore-recommeder-djdnaeh9eudkd4eu.southeastasia-01.azurewebsites.net/bundle-recommendations';
        axios.post(request_url, {
            product_id: product.productID,
            num_recommendations: 4
        })
            .then((response) => {
                console.log(response.data.bundle_recommendations);
                setProducts(response.data.bundle_recommendations);
            })
            .catch((error) => {
                console.log(error);
            });
    })
    return (
        <div className='recommender mt-10'>
            <h2>Recommended for you</h2>
            <div className='product-grid'>
                {products && products.map((product, index) => (
                    <RecommenderProductCard product={product} key={index} />
                ))}
            </div>
        </div>
    );
}

export default RecommenderProduct;