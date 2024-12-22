"use client";

import { useRouter } from 'next/navigation'; 
import React, { useState } from "react";

const ForgotPassword = () => {
  const router = useRouter();
  const [step, setStep] = useState(1); // Quản lý bước hiện tại: 1 - Nhập email, 2 - OTP, 3 - Đổi mật khẩu
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpInputs, setOtpInputs] = useState(Array(6).fill("")); // OTP gồm 6 ký tự
  const [error, setError] = useState("");

  const backLoginPage = () => {
    router.push("/authentication");
  };

  // Gửi OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://lthshop.azurewebsites.net/api/Authen/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      if (!response.ok) throw new Error(await response.text());
      setStep(2);
    } catch (err) {
      setError(err.message || "Failed to send OTP. Try again.");
    }
  };

  // Xác minh OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const otpValue = otpInputs.join(""); // Gộp các ô OTP thành chuỗi
      const response = await fetch(
        "https://lthshop.azurewebsites.net/api/Authen/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: otpValue }),
        }
      );
      if (!response.ok) throw new Error(await response.text());
      setStep(3);
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.");
    }
  };

  // Đổi mật khẩu
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const otpValue = otpInputs.join(""); // Gộp các ô OTP thành chuỗi
      const response = await fetch(
        "https://lthshop.azurewebsites.net/api/Authen/change-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: otpValue, newPassword }),
        }
      );
      if (!response.ok) throw new Error(await response.text());
      alert("Password changed successfully!");
      backLoginPage();
    } catch (err) {
      setError(err.message || "Failed to change password.");
    }
  };

  // Xử lý thay đổi OTP
  const handleOtpChange = (value, index) => {
    if (!/^\d$/.test(value) && value !== "") return; // Chỉ cho phép số
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    setOtpInputs(newOtpInputs);

    // Tự động chuyển sang ô tiếp theo
    if (value !== "" && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center p-4" style={{margin: '150px'}}>
      <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-6">Forgot Password</h2>
            <form onSubmit={handleSendOtp}>
              <label className="block mb-4">
                Email
                <input
                  type="email"
                  className="w-full p-2 border rounded-md mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <button
                type="submit"
                className="w-full text-white p-2 rounded-md"
              >
                Send OTP
              </button>
            </form>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-6 text-center">Enter OTP</h2>
            <form onSubmit={handleVerifyOtp}>
              <div className="flex justify-between mb-4">
                {otpInputs.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 text-center border rounded-md text-lg ml-3"
                    value={value}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full text-white p-2 rounded-md"
              >
                Verify OTP
              </button>
            </form>
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="text-xl font-bold mb-6">Change Password</h2>
            <form onSubmit={handleChangePassword}>
              <label className="block mb-4">
                New Password
                <input
                  type="password"
                  className="w-full p-2 border rounded-md mt-1"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </label>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Change Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
