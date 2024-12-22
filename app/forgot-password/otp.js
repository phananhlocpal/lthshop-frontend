'use client'
import { useState } from "react";

const OTPForm = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; // Chỉ cho phép nhập số

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Tự động chuyển sang ô tiếp theo nếu có
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP Submitted:", otp.join(""));
  };

  return (
    <div className="max-h-screen flex items-center justify-center" style={{ margin: "200px" }}>
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex justify-between">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center border rounded-md text-lg"
                value={value}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !value && e.target.previousSibling) {
                    e.target.previousSibling.focus();
                  }
                }}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md focus:outline-none focus:shadow-outline-blue hover:bg-blue-600 transition"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPForm;
