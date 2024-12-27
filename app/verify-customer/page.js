import React from "react";

function VerifyCustomer() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Xác thực tài khoản
        </h1>
        <p className="text-gray-600">Vui lòng xác thực tài khoản được gửi trong Email</p>
      </div>
    </div>
  );
}

export default VerifyCustomer;
