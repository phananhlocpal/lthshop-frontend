import React from 'react';

function ModalPaymentSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b mt-10">
      <div
        className="w-full max-w-sm p-8 mx-4 text-center transition-all transform bg-white shadow-lg rounded-xl hover:shadow-xl">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full">
          <svg className="w-8 h-8 text-green-600 mt-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="mb-4 text-2xl font-semibold text-green-600">
          Payment Successful!
        </h1>
        <p className="mb-6 text-lg text-gray-700">
          Thank you for your purchase.
        </p>
        <div className="pt-6 mt-6 border-t border-gray-100">
          <p className="text-lg text-gray-700">
            Have questions? Contact us at:
          </p>
          <a href="mailto:admin@eliteai.tools"
            className="inline-block mt-2 text-xl font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800">
            lthstore.dev@gmail.com
          </a>
        </div>
        <div className="mt-8">
          <a href="/"
            className="inline-block px-6 py-3 text-lg font-semibold text-white transition-colors duration-200 bg-green-600 rounded-lg hover:bg-green-700">
            Return to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

export default ModalPaymentSuccess;
