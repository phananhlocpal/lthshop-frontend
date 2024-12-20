"use client"
import React, { useState, useEffect } from 'react';
import LogIn from '../../components/checkout/LogIn';
import Shipping from '../../components/checkout/Shipping';
import Confirmation from '../../components/checkout/Confirmation';
import Complete from "../../components/checkout/Complete"
import { selectCurrentUser } from '../../store/reducers/userSlice';
import { useSelector } from 'react-redux';
import Payment from '@/components/checkout/Payment';
import Link from 'next/link';

const tabs = ["Log In", "Shipping", "Payment", "Confirm", "Done"];

function Checkout() {
  const [activeTab, setActiveTab] = useState(0);
  const currentUser = useSelector(selectCurrentUser);
  const [shippingFee, setShippingFee] = useState(0);
  
  const handleShippingFeeChange = (fee) => {
    setShippingFee(fee);
  };

  useEffect(() => {
    if (currentUser) {
      setActiveTab(1);
    }
  }, [currentUser]);

  const isLastTab = activeTab === tabs.length - 1;
  const isSecondLastTab = activeTab === tabs.length - 2;

  const onPaymentComplete = () => {
    setActiveTab(4);
  };

  return (
    <div className='checkout'>
      <div className='checkout-container'>
        <nav className='checkout-nav'>
          {tabs.map((tab, index) => (
            <React.Fragment key={tab}>
              <div className={`checkout-tab ${index === activeTab ? 'active' : ''}`}>
                <span className={`${index < activeTab ? 'completed' : ''}`}>
                  {index+1}
                </span>
                <p>{tab}</p>
              </div>
              {index < tabs.length - 1 && (
                <div className={`checkout-tab-line ${index < activeTab ? 'completed' : ''}`} />
              )}
            </React.Fragment>
          ))}
        </nav>
        <div className="checkout-content">
          {activeTab === 0 && <LogIn />}
          {activeTab === 1 && <Shipping onShippingFeeChange={handleShippingFeeChange} />}
          {activeTab === 2 && <Payment />}
          {activeTab === 3 && <Confirmation onPaymentComplete={onPaymentComplete} shippingFee={shippingFee} />}
          {activeTab === 4 && <Complete />}
        </div>
        <div className="checkout-bottom">
          {!isLastTab ? (
            activeTab === 0 ? (
              <Link href="/cart"><button className='second-button'>Back</button></Link> // Đúng cú pháp
            ) : (
              <button className='second-button' onClick={() => setActiveTab(activeTab - 1)}>Back</button>
            )
          ) : null}
          {currentUser && !isSecondLastTab && !isLastTab && (
            <button onClick={() => setActiveTab(activeTab + 1)}>Next</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Checkout;
