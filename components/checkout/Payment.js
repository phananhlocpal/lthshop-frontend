'use client';
import React, { useState } from 'react';

function SmsOtpVerification({ generatedOtp, onOtpVerified }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, ""); // Chỉ cho phép nhập số
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus vào ô tiếp theo nếu có giá trị
      if (value !== "" && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleBackspace = (element, index) => {
    if (element.value === "" && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === generatedOtp) {
      alert("OTP Verified!");
      onOtpVerified(); // Chuyển sang tab tiếp theo
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="p-8 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">SMS OTP Verification</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please enter the 6-digit OTP sent to your phone.
        </p>

        <div className="flex justify-center gap-2 mb-6">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => {
                if (e.key === "Backspace") handleBackspace(e.target, index);
              }}
              className="w-12 h-12 text-center text-lg border rounded-md focus:outline-none focus:ring-2 "
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full py-2 text-white rounded-md transition duration-200 text-sm font-medium"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}

export default SmsOtpVerification;
