'use client'
import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useCart } from "../../utils/hooks/useCart";
import { selectCurrentUser } from "../../store/reducers/userSlice";
import { useSelector } from 'react-redux';
import orderApi from '../../utils/api/orderApi';

function OrderSummary({ onPaymentComplete, shippingFee }) {
  const [usdTotal, setUsdTotal] = useState(null);
  const { subtotal, delivery, discount, defaultTotal, clearCart } = useCart();
  const currentUser = useSelector((selectCurrentUser));
  const buttonStyles = {
    layout: 'vertical',
    color: 'blue',
    label: 'checkout',
  };

  const total = defaultTotal + (shippingFee || 0);

  useEffect(() => {
    // Fetch exchange rate from a currency conversion API
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/VND');
        const data = await response.json();
        const vndToUsdRate = data.rates.USD; // Extract the USD rate from the API response
        const convertedTotal = total * vndToUsdRate; // Convert VND to USD
        setUsdTotal(convertedTotal.toFixed(2)); // Update state with the USD total
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, [total]);

  const handleVnpayPayment = async () => {
    try {
      const orderData = {
        totalPrice: defaultTotal,
        customerID: currentUser.customerID,
      };
      // Gửi yêu cầu tạo URL thanh toán đến backend
      console.log("Order data: ", orderData);
      const response = await orderApi.createOrderVnPay(orderData);
      const vnpayUrl = response.redirectUrl; 
      console.log(vnpayUrl);
      // window.location.href = vnpayUrl;
      // onPaymentComplete();

    } catch (error) {
      console.error('Error initiating VNPAY payment:', error);
    }
  };

  const onApprovePaypal = async (data, actions) => {
    const order = await actions.order.capture();
    console.log('Order details:', order);
    const email = order.payer.email_address;
    const transactionId = order.purchase_units[0].payments.captures[0].id;
    alert(`An order confirmation will be sent to email: ${email}. Transaction ID: ${transactionId}.`);

    // Prepare order data
    const orderData = {
      totalPrice: total,
      transactionId: transactionId,
      customerID: currentUser.customerID,
    };

    console.log('Order data:', orderData);

    // Send order data to the backend
    try {
      const response = await orderApi.createOrderPaypal(orderData);
      console.log('Order saved successfully:', response.data);
      onPaymentComplete();
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  if (usdTotal === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className='order-summary'>
      <div className="space-between">
        <p>Subtotal</p>
        <p>{subtotal} VND</p>
      </div>
      {discount > 0 && (
        <div className="space-between">
          <p>Discount</p>
          <p>-10%</p>
        </div>
      )}
      <div className="space-between">
        <p>Delivery</p>
        <p>{shippingFee?.toLocaleString() || 0} VND</p>
      </div>
      <div className="line"></div>
      <div className="space-between bold">
        <p>Total (VND)</p>
        <p>{total.toLocaleString()} VND</p>
      </div>
      <div className='space-between bold'>
        <p>Total (USD)</p>
        <p>{usdTotal} USD</p>
      </div>
      <PayPalScriptProvider options={{ "client-id": "ASWQENE-qmdKB-AOzSTZFtuJfz8v26F7NxtFgpgAMvDGaeACJBuz6EOXju2d5KlXJ9h2QoJRM6XrpHi_", currency: "USD" }}>
        <PayPalButtons
          style={buttonStyles}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: usdTotal,
                  },
                },
              ],
            });
          }}
          onApprove={onApprovePaypal}
        />
      </PayPalScriptProvider>
      <div className="vnpay-button-component flex justify-center items-center animate-fade-in mt-5 w-100">
        <button onClick={handleVnpayPayment} className="vnpay-button flex items-center justify-center bg-white border border-gray-300 rounded-lg px-6 py-3 shadow-md transition-transform duration-300 hover:bg-gray-100 hover:border-gray-500 hover:shadow-lg hover:scale-105">
          <div className='flex items-center justify-between'>
            <img src="https://vivnpay.vn/assets/media/logo/logo-52.svg" alt="VNPAY Logo" className="w-36 h-auto" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;