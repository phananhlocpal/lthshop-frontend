"use client";
import React, { useState, useEffect } from "react";
import LogIn from "../../components/checkout/LogIn";
import Shipping from "../../components/checkout/Shipping";
import Confirmation from "../../components/checkout/Confirmation";
import Complete from "../../components/checkout/Complete";
import { selectCurrentUser } from "../../store/reducers/userSlice";
import { useSelector } from "react-redux";
import Link from "next/link";
import SmsOtpVerification from "@/components/checkout/Payment";

const tabs = ["Log In", "Shipping", "VerifyOTP", "Confirm", "Done"];

function Checkout() {
  const [activeTab, setActiveTab] = useState(0);
  const currentUser = useSelector(selectCurrentUser);
  const [shippingFee, setShippingFee] = useState(0);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const handleShippingFeeChange = (fee) => {
    setShippingFee(fee);
  };

  /*
  const handleSendSMS = async () => {
    if (!currentUser || !currentUser.phone) {
      console.log("Fail: No phone number available");
      alert("No phone number available. Please log in with a valid account.");
      return;
    }

    try {
      console.log("Attempting to send OTP...");
      const response = await fetch(
        "http://localhost:5049/api/speedsms/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phones: [currentUser.phone],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Successfully:", {
          status: "Success",
          otp: data.message,
          phoneNumber: currentUser.phone,
        });
        setGeneratedOtp(data.message);
        alert("OTP has been sent to your phone.");
      } else {
        console.log("Fail:", {
          status: "Failed",
          statusCode: response.status,
          statusText: response.statusText,
        });
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.log("Fail:", {
        status: "Error",
        message: error.message,
      });
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Please check the console for details.");
    }
  };
  */

  const onNext = () => {
    if (activeTab === 1) {
      // handleSendSMS(); // Đã comment lại để vô hiệu hóa gửi SMS
    }
    if (activeTab === 2 && !otpVerified) {
      alert("Please verify OTP before proceeding.");
      return;
    }
    setActiveTab(activeTab + 1); // Chuyển sang tab tiếp theo
  };

  const onOtpVerified = () => {
    setOtpVerified(true);
    setActiveTab(activeTab + 1);
  };

  useEffect(() => {
    if (currentUser) {
      setActiveTab(1);
    }
  }, [currentUser]);

  return (
    <div className="checkout">
      <div className="checkout-container">
        <nav className="checkout-nav">
          {tabs.map((tab, index) => (
            <React.Fragment key={tab}>
              <div
                className={`checkout-tab ${
                  index === activeTab ? "active" : ""
                }`}
              >
                <span className={`${index < activeTab ? "completed" : ""}`}>
                  {index + 1}
                </span>
                <p>{tab}</p>
              </div>
              {index < tabs.length - 1 && (
                <div
                  className={`checkout-tab-line ${
                    index < activeTab ? "completed" : ""
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </nav>
        <div className="checkout-content">
          {activeTab === 0 && <LogIn />}
          {activeTab === 1 && (
            <Shipping onShippingFeeChange={handleShippingFeeChange} />
          )}
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
            <button
              className="second-button"
              onClick={() => setActiveTab(activeTab - 1)}
            >
              Back
            </button>
          )}
          {activeTab < tabs.length - 1 && (
            <button
              className="next-button"
              onClick={onNext}
              disabled={!otpVerified && activeTab === 2}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
