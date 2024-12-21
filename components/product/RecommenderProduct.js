import React, { useEffect, useState } from "react";
import axios from "axios";
import RecommenderProductCard from "./RecommenderProductItem";
import { variables } from "@/utils/api/variables";

function RecommenderProduct({ product }) {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        console.log(product.productID);
        const request_url = variables.RECOMMENDATION_API_BUNDLE; // Sử dụng biến từ `variables`
        
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
    }, [product.productID]); // Thêm `product.productID` làm dependency để tránh lỗi

    return (
        <div className="recommender">
            <h2>Recommended for you</h2>
            <div className="product-grid">
                {products && products.map((product, index) => (
                    <RecommenderProductCard product={product} key={index} />
                ))}
            </div>
        </div>
    );
}

export default RecommenderProduct;
