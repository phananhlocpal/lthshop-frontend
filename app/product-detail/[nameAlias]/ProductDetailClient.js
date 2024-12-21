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
  const [selectedSize, setSelectedSize] = useState(null);
  const [fbLoaded, setFbLoaded] = useState(false);

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

  const handleFacebookShare = () => {
    if (fbLoaded && window.FB) {
      window.FB.ui(
        {
          method: "share",
          href: window.location.href,
        },
        (response) => console.log("Share response:", response)
      );
    } else {
      alert("Facebook SDK is not loaded.");
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Meta tags */}
      <Head>
        <meta
          name="description"
          content={product.description || "No description available"}
        />
        <meta name="title" content={product.name || "Product Title"} />
        <title>{product.name || "Product Title"}</title>
      </Head>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product image */}
        <div className="flex justify-center items-center">
          <img
            src={product.imageURL || "https://via.placeholder.com/500"}
            alt={product.name || "Product Image"}
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Product details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {product.name || "Product Name"}
          </h1>
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
                {product.productSizes
                  .slice() // Create a shallow copy of the array
                  .sort((a, b) => a.size - b.size)
                  .map((size, index) => (
                    <option
                      key={`${size.size}-${size.price}`}
                      value={JSON.stringify(size)}
                    >
                      VN {size.size} - {formatPrice(size.price)}{" "}
                      {size.quantity <= 3 ? `(only ${size.quantity} left)` : ""}
                    </option>
                  ))}
              </select>

            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

          {/* Facebook Share Button */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handleFacebookShare}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
            >
              Share on Facebook
            </button>
          </div>
        </div>
      </div>
      <RecommenderProduct product={product} />
    </div>
  );
}
