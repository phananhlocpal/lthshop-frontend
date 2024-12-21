'use client';

import React, { useState, useEffect } from 'react';
import RecommenderProductCard from '../product/RecommenderProductItem';
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/reducers/userSlice";

function Recommender() {
    const [products, setProducts] = useState([]);
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        const request_url = 'https://lthstore-recommeder-djdnaeh9eudkd4eu.southeastasia-01.azurewebsites.net/recommendations';
        if (currentUser) {
            axios.post(request_url, {
                customer_id: currentUser.id,
                num_recommendations: 8
            })
                .then((response) => {
                    setProducts(response.data.recommendations);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios.post(request_url, {
                num_recommendations: 8
            })
                .then((response) => {
                    setProducts(response.data.recommendations);
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
                    <RecommenderProductCard product={product} key={index} />
                ))}
            </div>
        </div>
    );
}
export default Recommender;