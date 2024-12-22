"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const VerifyEmail = ({ params }) => {
  const { token } = params; // Lấy token từ URL động
  const router = useRouter();
  const [message, setMessage] = useState("Verifying your email...");
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Gọi API xác minh email
    axios
      .post(`https://lthshop.azurewebsites.net/api/Authen/verify-email`, {
        token,
      })
      .then(() => {
        setMessage("Your email has been successfully verified!");
      })
      .catch(() => {
        setMessage("Failed to verify email. Please try again.");
      });
  }, [token]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      router.push("/"); // Chuyển hướng về trang chủ
    }

    return () => clearInterval(timer);
  }, [countdown, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Verify Email</h1>
        <p className="text-gray-600">{message}</p>
        {message.includes("successfully") && (
          <p className="text-sm text-gray-500 mt-2">
            Redirecting to home in <span className="font-bold">{countdown}</span> seconds...
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
