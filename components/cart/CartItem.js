'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Use Next.js Link component
import { useCart } from '../../utils/hooks/useCart';
import { formatPrice } from '../../utils/hooks/useUtil';

function CartItem() {
  const { removeFromCart, updateQuantity, items } = useCart();

  // State to store the product prices
  const [productPrices, setProductPrices] = useState({});

  // Fetch the price for each productSizeID
  useEffect(() => {
    const fetchProductPrices = async () => {
      const priceData = {};
      for (const item of items) {
        try {
          const response = await fetch(`http://localhost:5049/api/ProductPrices/${item.productSizeID}`);
          const data = await response.json();
          if (data && data.sellingPrice) {
            priceData[item.productSizeID] = data.sellingPrice;
          }
        } catch (error) {
          console.error("Error fetching product price:", error);
        }
      }
      setProductPrices(priceData);
    };

    fetchProductPrices();
  }, [items]);

  // Calculate total price for an item
  const calculateTotalPrice = (item) => {
    const price = productPrices[item.productSizeID] || 0;
    return price * item.quantity;
  };

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
              <p>{formatPrice(calculateTotalPrice(item))}</p> {/* Display the total price for the item */}
              <div className='cart-item-quantity'>
                <a onClick={() => updateQuantity({
                  cartItemID: item.cartItemID,
                  product: item.product,
                  productPrice: productPrices[item.productSizeID], // Pass the price as well
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
                      productPrice: productPrices[item.productSizeID], // Pass the price as well
                      productSizeID: item.productSizeID,
                      productSize: item.productSize,
                      quantity: newQuantity
                    });
                  }
                }} />
                <a onClick={() => updateQuantity({
                  cartItemID: item.cartItemID,
                  product: item.product,
                  productPrice: productPrices[item.productSizeID],
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
