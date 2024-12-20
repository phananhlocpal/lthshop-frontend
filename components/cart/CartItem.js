'use client';
import React from 'react';
import Link from 'next/link'; // Use Next.js Link component
import { useCart } from '../../utils/hooks/useCart';
import { formatPrice } from '../../utils/hooks/useUtil';

function CartItem() {
  const { removeFromCart, updateQuantity, items } = useCart();

  console.log(items);
  return (
    <>
      {items.map((item) => (
        <div className="cart-item" key={`${item.product.productID}-${item.productSize}`}>
          <Link href={`/${item.product.productID}`}>
            <div className='cart-item-img'>
              <img src={item.product.imageURL} alt={item.product.brand} />
            </div>
          </Link>
          <div className='cart-item-about'>
            <div className='cart-item-left'>
              <Link href={`/${item.product.productID}`}>
                <p>{item.product.brand} {item.product.name}</p>
              </Link>
              <p>Brand: {item.product.brand}</p>
              <p>Size: {item.productSize}</p>
              <p>Quantity: {item.quantity}</p>
              <a onClick={() => removeFromCart(item.product.productID, item.productSize, item.cartItemID)}>Remove</a>
            </div>
            <div className='cart-item-right'>
              <p>{formatPrice(item.productPrice)}</p>
              <div className='cart-item-quantity'>
                <a onClick={() => updateQuantity({
                  cartItemID: item.cartItemID,
                  product: item.product,
                  productPrice: item.productPrice,
                  productSizeID: item.productSizeID,
                  productSize: item.productSize,
                  quantity: item.quantity - 1,
                })}>-</a>
                <input type="number" value={item.quantity} onChange={(e) => {
                  const newQuantity = parseInt(e.target.value);
                  if (!isNaN(newQuantity)) {
                    updateQuantity({
                      cartItemID: item.cartItemID,
                      product: item.product,
                      productPrice: item.productPrice,
                      productSizeID: item.productSizeID,
                      productSize: item.productSize,
                      quantity: newQuantity
                    });
                  }
                }} />
                <a onClick={() => updateQuantity({
                  cartItemID: item.cartItemID,
                  product: item.product,
                  productPrice: item.productPrice,
                  productSizeID: item.productSizeID,
                  productSize: item.productSize,
                  quantity: item.quantity + 1,
                })}>+</a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CartItem;
