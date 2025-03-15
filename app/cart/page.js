"use client";
import React, { useState, useEffect } from 'react';
import { DELIVERY_THRESHOLD } from '../../store/reducers/cartSlice';
import Link from 'next/link';
import CartItem from '@/components/cart/CartItem';
import { useCart } from '@/utils/hooks/useCart';
import { formatPrice } from '@/utils/hooks/useUtil';

function CartPage() {
  const { discount, applyDiscount, clearCart, items, delivery, quantity } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [productPrices, setProductPrices] = useState({});

  // Fetch product prices based on productSizeID
  useEffect(() => {
    const fetchProductPrices = async () => {
      const priceData = {};
      for (const item of items) {
        try {
          const response = await fetch(`http://localhost:5049/api/ProductPrices/${item.productSizeID}`);
          const data = await response.json();
          if (data && data.sellingPrice) {
            priceData[item.productSizeID] = data.sellingPrice; // Store the price for each productSizeID
          }
        } catch (error) {
          console.error("Error fetching product price:", error);
        }
      }
      setProductPrices(priceData); // Update the prices after fetching
    };

    fetchProductPrices();
  }, [items]); // Re-fetch when cart items change

  // Calculate subtotal using the fetched product prices
  const calculateSubtotal = () => {
    return items.reduce((acc, item) => {
      const price = productPrices[item.productSizeID] || 0; // Use fetched price or 0 if not found
      const totalPrice = price * item.quantity;
      return acc + totalPrice;
    }, 0);
  };

  // Calculate total price after discount and delivery
  const calculateTotal = () => {
    const subtotalAmount = calculateSubtotal();
    let discountAmount = 0;
    if (discount > 0) {
      discountAmount = subtotalAmount * 0.1; // Assuming 10% discount for simplicity
    }

    const totalAmount = subtotalAmount - discountAmount + (delivery || 0);
    return totalAmount;
  };

  return (
    <div className='cart flex container'>
      <div className='cart-container flex-2'>
        <h1>Shopping Bag {quantity > 0 ? "(" + quantity + " " + (quantity === 1 ? "product" : "products") + ")" : ""}</h1>
        {items.length === 0 ? (
          <p>There’s nothing in your bag yet.</p>
        ) : (
          <div className='cart-items'>
            <CartItem />
            <a onClick={clearCart}>Clear Cart</a>
          </div>
        )}
      </div>
      {quantity > 0 && (
        <div className='cart-summary'>
          <div className='summary-content'>
            <h2>Summary</h2>
            <div className="space-between">
              <p>Subtotal</p>
              <p>{formatPrice(calculateSubtotal())}</p> {/* Display the subtotal */}
            </div>
            {discount > 0 && (
              <div className="space-between">
                <p>Discount</p>
                <p>-10%</p>
              </div>
            )}
            <div className="space-between">
              <p>Delivery</p>
              <p>{delivery ? formatPrice(delivery) : "Free"}</p>
            </div>
            <div className='line'></div>
            <div className="space-between bold">
              <p>Total</p>
              <p>{formatPrice(calculateTotal())}</p> {/* Display the total */}
            </div>
            <Link href="/checkout"><button>CHECKOUT</button></Link>
            {calculateSubtotal() < DELIVERY_THRESHOLD ? (
              <p>
                Spend {formatPrice(DELIVERY_THRESHOLD - calculateSubtotal())} more and get free shipping!
              </p>
            ) : (<p>Your order is eligible for free shipping.</p>)}
          </div>
          {!discount > 0 &&
            <div className="discount-code">
              <input placeholder="Discount Code" type="text" onChange={(e) => setDiscountCode(e.target.value)} />
              <button onClick={() => applyDiscount(discountCode)}>Apply</button>
            </div>
          }
        </div>
      )}
    </div>
  );
}

export default CartPage;
