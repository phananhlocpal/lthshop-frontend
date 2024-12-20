"use client"
import React from 'react'
import { useWishlist } from '../../utils/hooks/useWishlist'
import ProductCard from '@/components/product/ProductItem';

function Wishlist() {
    const { wishlistItems, clearWishlist} = useWishlist();

  return (
    <div className='wishlist container'>
        <div className='wishlist-control'>
            <a onClick={clearWishlist}>Clear Wishlist</a>
        </div>
        <div className='product-grid'>
            {wishlistItems.map((product, index) => 
                <ProductCard product={product} key={index}/>
            )}
        </div>
    </div>
  )
}

export default Wishlist