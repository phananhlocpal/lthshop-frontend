"use client";
import React, { useState, useEffect } from "react";
import LogIn from "../../components/checkout/LogIn";
import Shipping from "../../components/checkout/Shipping";
import Confirmation from "../../components/checkout/Confirmation";
import Complete from "../../components/checkout/Complete";
import { selectCurrentUser } from "../../store/reducers/userSlice";
import { useSelector } from "react-redux";


const tabs = ["Log In", "Shipping", "Confirm", "Done"];

function Checkout() {
  const [activeTab, setActiveTab] = useState(0);
  const currentUser = useSelector(selectCurrentUser);
  const [shippingFee, setShippingFee] = useState(0);


  const handleShippingFeeChange = (fee) => {
    setShippingFee(fee);
  };

  const onNext = () => {
    setActiveTab(activeTab + 1); // Chuyển sang tab tiếp theo
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
