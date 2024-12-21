"use client";

import React, { useState, useEffect } from "react";
import { formatPrice } from "@/utils/hooks/useUtil";
import { useCart } from "@/utils/hooks/useCart";
import Head from "next/head";
import RecommenderProduct from "@/components/product/RecommenderProduct";

// Function to load Facebook SDK
const loadFacebookSDK = () => {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && !window.FB) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.FB.init({
          appId: "947940970532246",
          cookie: true,
          xfbml: true,
          version: "v17.0",
        });
        resolve(window.FB);
      };
      script.onerror = () => reject("Failed to load Facebook SDK");
      document.body.appendChild(script);
    } else {
      resolve(window.FB);
    }
  });
};

export default function ProductDetailClient({ product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null); // State to store selected size
  const [fbLoaded, setFbLoaded] = useState(false); // State to check if Facebook SDK is loaded

  useEffect(() => {
    loadFacebookSDK()
      .then(() => setFbLoaded(true))
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    addToCart({
      product: product,
      productPrice: selectedSize.price,
      productSizeID: selectedSize.productSizeID,
      productSize: selectedSize.size,
      quantity: 1,
    });
  };

  // const handleFacebookShare = () => {
  //   if (fbLoaded && window.FB) {
  //     window.FB.ui(
  //       {
  //         method: "share",
  //         href: window.location.href,
  //       },
  //       (response) => console.log("Share response:", response)
  //     );
  //   } else {
  //     alert("Facebook SDK is not loaded.");
  //   }
  // };

  return (
    <div className="container mx-auto py-12 px-4">
      <Head>
        <meta
          name="description"
          content={product.description || "No description available"}
        />
        <meta name="title" content={product.name || "Product Title"} />
        <title>{product.name || "Product Title"}</title>
      </Head>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <img
            src={product.imageURL || "https://via.placeholder.com/500"}
            alt={product.name || "Product Image"}
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {product.name || "Product Name"}
          </h1>
          <div
            className="fb-share-button fixed bottom-3"
            data-href={window.location.href}
            data-layout="button"
            data-size="large"
          ></div>
          <h3
            className="text-xl italic text-gray-500"
            style={{ fontWeight: "400", fontSize: "1.5rem" }}
          >
            {product.brand || "Product Name"}
          </h3>

          <p className="text-gray-700">
            {product.description || "No description available."}
          </p>

          {product.productSizes && product.productSizes.length > 0 && (
            <div>
              <label
                htmlFor="size-select"
                className="block text-gray-700 font-medium mb-2"
              >
                Available Sizes
              </label>
              <select
                id="size-select"
                className="border border-gray-300 rounded-md p-2 w-full"
                onChange={(e) => setSelectedSize(JSON.parse(e.target.value))}
              >
                <option value="">Select size</option>
                {[...product.productSizes]
                  .sort((a, b) => a.size - b.size)
                  .map((size, index) => (
                    <option
                      key={`${size.size}-${size.price}`}
                      value={JSON.stringify(size)}
                    >
                      EU {size.size} - {formatPrice(size.price)}{" "}
                      {size.quantity <= 3 ? `(only ${size.quantity} left)` : ""}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              className="nds-btn mb3-sm css-dnr0el btn-primary-dark  btn-lg"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
          <div className="bg-gray-100 text-center p-4 rounded-lg shadow-md">
            <p className="text-gray-900 font-medium">
              This product is made with at least 20% recycled content by weight
            </p>
          </div>
          <div className="container border-t">
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
                    Your order of 5.000.000₫ or more gets free standard
                    delivery.
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
      </div>
      <RecommenderProduct product={product} />
    </div>
  );
}
