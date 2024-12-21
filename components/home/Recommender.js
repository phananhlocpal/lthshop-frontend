'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from '../product/ProductItem';
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/reducers/userSlice";

function Recommender() {
    const [products, setProducts] = useState([]);
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        const request_url = 'http://localhost:3000/api/recommendations';
        if (currentUser) {
            axios.post(request_url, {
                customer_id: currentUser.id,
                num_recommendations: int = 8
            })
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios.post(request_url, {
                num_recommendations: int = 8
            })
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

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
export default Recommender;