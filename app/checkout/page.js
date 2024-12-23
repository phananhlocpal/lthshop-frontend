'use client';
import React, { useState, useEffect } from 'react';
import LogIn from '../../components/checkout/LogIn';
import Shipping from '../../components/checkout/Shipping';
import Confirmation from '../../components/checkout/Confirmation';
import Complete from "../../components/checkout/Complete";
import { selectCurrentUser } from '../../store/reducers/userSlice';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import SmsOtpVerification from '@/components/checkout/Payment';

const tabs = ["Log In", "Shipping", "Payment", "Confirm", "Done"];

function Checkout() {
  const [activeTab, setActiveTab] = useState(0);
  const currentUser = useSelector(selectCurrentUser);
  const [shippingFee, setShippingFee] = useState(0);
  const [generatedOtp, setGeneratedOtp] = useState(""); // Lưu OTP đã gửi

  const handleShippingFeeChange = (fee) => {
    setShippingFee(fee);
  };

  const sendOtp = async () => {
    if (!currentUser || !currentUser.phone) {
      alert("No phone number available. Please log in with a valid account.");
      return;
    }

    try {
      const response = await fetch('https://lthshop.azurewebsites.net/api/speedsms/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phones: [`${currentUser.phone}`], // Sử dụng số điện thoại từ currentUser
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("OTP Sent:", data);
        setGeneratedOtp(data.message); // Lưu OTP từ trường `message`
        alert("OTP has been sent to your phone.");
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Please check the console for details.");
    }
  };

  const onNext = () => {
    if (activeTab === 2) {
      // Thực hiện gửi OTP khi vào tab "Payment"
      sendOtp();
    }
    setActiveTab(activeTab + 1); // Chuyển sang tab tiếp theo
  };

  const onOtpVerified = () => {
    setActiveTab(activeTab + 1); // Chuyển sang tab tiếp theo nếu OTP đúng
  };

  useEffect(() => {
    if (currentUser) {
      setActiveTab(1);
    }
  }, [currentUser]);

  return (
    <div className='checkout'>
      <div className='checkout-container'>
        <nav className='checkout-nav'>
          {tabs.map((tab, index) => (
            <React.Fragment key={tab}>
              <div className={`checkout-tab ${index === activeTab ? 'active' : ''}`}>
                <span className={`${index < activeTab ? 'completed' : ''}`}>
                  {index + 1}
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
          {activeTab === 2 && (
            <SmsOtpVerification
              generatedOtp={generatedOtp} // Truyền OTP đã gửi xuống
              onOtpVerified={onOtpVerified} // Hàm chuyển tab
            />
          )}
          {activeTab === 3 && <Confirmation shippingFee={shippingFee} />}
          {activeTab === 4 && <Complete />}
        </div>
        <div className="checkout-bottom">
          {activeTab > 0 && (
            <button className='second-button' onClick={() => setActiveTab(activeTab - 1)}>
              Back
            </button>
          )}
          {activeTab < tabs.length - 1 && (
            <button className='next-button' onClick={onNext}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
