import React from "react";

function ProductInfo() {
  return (
    <div>
      <div className="bg-gray-100 text-center p-4 rounded-lg shadow-md">
        <p className="text-gray-900 font-medium">
          This product is made with at least 20% recycled content by weight
        </p>
      </div>
      <div
        className="container border-t"
        style={{ minHeight: "50px", padding: "0px" }}
      >
        <div className="space-y-4">
          {/* Size & Fit */}
          <details className="group border-b cursor-pointer">
            <summary className="flex justify-between items-center">
              <span className="text-base font-medium text-gray-800 text-left flex-1">
                Size & Fit
              </span>
              <svg
                className="w-5 h-5 text-gray-600 transform group-open:rotate-180 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div className="mt-4 text-gray-600 text-sm">
              <ul className="list-disc pl-5">
                <li>Fits small; we recommend ordering half a size up</li>
                <li>
                  <a
                    href="https://www.nike.com/vn/size-fit/mens-footwear"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Size Guide
                  </a>
                </li>
              </ul>
            </div>
          </details>

          {/* Free Delivery and Returns */}
          <details className="group border-b cursor-pointer">
            <summary className="flex justify-between items-center py-4">
              <span className="text-base font-medium text-gray-800 text-left flex-1">
                Free Delivery and Returns
              </span>
              <svg
                className="w-5 h-5 text-gray-600 transform group-open:rotate-180 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div className="mt-4 text-gray-600 text-sm">
              <p>
                Your order of 5.000.000₫ or more gets free standard delivery.
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>Standard delivered 4-5 Business Days</li>
                <li>Express delivered 2-4 Business Days</li>
              </ul>
              <p className="mt-2">
                Nike Members enjoy{" "}
                <a
                  href="https://www.nike.com/vn/help/a/returns-policy-gs"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-blue-500"
                >
                  free returns
                </a>
                .
              </p>
            </div>
          </details>

          {/* How This Was Made */}
          <details className="group border-b cursor-pointer">
            <summary className="flex justify-between items-center py-4">
              <span className="text-base font-medium text-gray-800 text-left flex-1">
                How This Was Made
              </span>
              <svg
                className="w-5 h-5 text-gray-600 transform group-open:rotate-180 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div className="mt-4 text-gray-600 text-sm">
              <p>
                This product was responsibly designed utilizing recycled
                materials from post-consumer and/or post-manufactured waste.
              </p>
              <p className="mt-2">
                <a
                  href="https://www.nike.com"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-blue-500"
                >
                  Learn more about our Move to Zero journey
                </a>
              </p>
            </div>
          </details>

          {/* Reviews */}
          <details className="group border-b cursor-pointer">
            <summary className="flex justify-between items-center py-4">
              <span className="text-base font-medium text-gray-800 text-left flex-1">
                Reviews (28)
              </span>
              <svg
                className="w-5 h-5 text-gray-600 transform group-open:rotate-180 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div className="mt-4 text-gray-600 text-sm">
              <p>Here are some reviews...</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
