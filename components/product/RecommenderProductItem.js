'use client';
import React from 'react';
import Link from 'next/link';
import { icons } from '../../assets/icons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWishlist } from '../../utils/hooks/useWishlist';
import { formatPrice } from '../../utils/hooks/useUtil';

function RecommenderProductCard({ product, index }) {
  const { wishlistItems, toggleWishlistItem } = useWishlist();
  const itemExists = wishlistItems.find((item) => item.NameAlias === product.NameAlias);

  return (
    <>
      {product && (
        <div className='product-card' key={index}>
          <FontAwesomeIcon
            icon={itemExists ? icons.heartFull : icons.heart}
            onClick={() => toggleWishlistItem(product)}
          />
          <div className='product-img'>
            <Link href={`/product-detail/${product.NameAlias}`}>
              <img src={product.ImageURL} alt="" />
            </Link>
          </div>
          <div className='product-info'>
            <Link href={`/product-detail/${product.NameAlias}`}>
              <p>{product.Brand}</p>
              <h3>{product.Name}</h3>
              {/* <p>{formatPrice(product.productSizes[0].price)}</p> */}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default RecommenderProductCard;
