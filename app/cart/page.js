"use client";
import React, { useState, useEffect } from 'react';
import { DELIVERY_THRESHOLD } from '../../store/reducers/cartSlice';
import Link from 'next/link';
import CartItem from '@/components/cart/CartItem';
import { useCart } from '@/utils/hooks/useCart';
import { formatPrice } from '@/utils/hooks/useUtil';

function CartPage() {
  const { discount, applyDiscount, clearCart, items, quantity, subtotal, total } = useCart();
  const [discountCode, setDiscountCode] = useState('');

  return (
    <div className='cart flex container'>
      <div className='cart-container flex-2'>
        <h1>Shopping Bag {quantity > 0 ? "(" + quantity + " " + (quantity === 1 ? "product" : "products") + ")" : ""}</h1>
        {items.length === 0 ? (
          <p>There's nothing in your bag yet.</p>
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
              <p>{formatPrice(subtotal)}</p>
            </div>
            {discount > 0 && (
              <div className="space-between">
                <p>Discount</p>
                <p>-10%</p>
              </div>
            )}
            <div className='line'></div>
            <div className="space-between bold">
              <p>Total</p>
              <p>{formatPrice(total)}</p>
            </div>
            <Link href="/checkout"><button>CHECKOUT</button></Link>
            {subtotal < DELIVERY_THRESHOLD ? (
              <p>
                Spend {formatPrice(DELIVERY_THRESHOLD - subtotal)} more and get free shipping!
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