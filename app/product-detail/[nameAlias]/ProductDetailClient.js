"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/utils/hooks/useCart";
import Head from "next/head";
import RecommenderProduct from "@/components/product/RecommenderProduct";
import ModalSucess from "@/components/modal/ModalSucess";
import ModalFailure from "@/components/modal/ModalFailure";
import { formatPrice } from "@/utils/hooks/useUtil";

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
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [modalFailureOpen, setModalFailureOpen] = useState(false);
  const [sellingPrice, setSellingPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });
  const [selectedSize, setSelectedSize] = useState(null); // State to store selected size
  const [fbLoaded, setFbLoaded] = useState(false); // State to check if Facebook SDK is loaded
  const [filteredSizes, setFilteredSizes] = useState([]); // State to store filtered sizes
  const [isOutOfStock, setIsOutOfStock] = useState(false); // State to check if selected size is out of stock

  useEffect(() => {
    loadFacebookSDK()
      .then(() => setFbLoaded(true))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      const availableSizes = [];
      for (let size of product.productSizes) {
        try {
          const response = await fetch(
            `http://localhost:5049/api/ProductPrices/${size.productSizeID}`
          );
          const data = await response.json();

          if (data.productPriceStatus === 0) {
            availableSizes.push(size); // Add size to the list if productPriceStatus is 0
          }
        } catch (error) {
          console.error("Error fetching product price status:", error);
        }
      }
      setFilteredSizes(availableSizes); // Set the filtered sizes to state
    };

    fetchPrices(); // Fetch the prices when the product changes
  }, [product]);

  const handleAddToCart = () => {
    console.log("handleAddToCart function triggered");

    if (!selectedSize) {
      console.log("No size selected");
      setModalContent({
        title: "Error",
        message: "Please select a size before adding to cart.",
      });
      setModalFailureOpen(true);
      return;
    }

    // Check if the selected size is out of stock (realQuantity < 1)
    if (isOutOfStock || selectedSize.realQuantity < 1) {
      console.log("Out of stock");
      setModalContent({
        title: "Error",
        message: "Sorry, this product is out of stock.",
      });
      setModalFailureOpen(true);
      return;
    }

    const cartItem = {
      product: product,
      productPrice: sellingPrice,
      productSizeID: selectedSize.productSizeID,
      productSize: selectedSize.size,
      quantity: quantity,
    };

    console.log("Adding to cart:", cartItem);

    addToCart(cartItem);

    setModalContent({
      title: "Success",
      message: `Successfully added "${product.name}" (Size ${selectedSize.size}) to your cart!`,
    });
    setModalSuccessOpen(true);
  };

  const handleSizeChange = async (e) => {
    const selectedSize = JSON.parse(e.target.value);
    setSelectedSize(selectedSize);

    try {
      // Fetching the price data
      const response = await fetch(
        `http://localhost:5049/api/ProductPrices/${selectedSize.productSizeID}`
      );
      const data = await response.json();

      if (data && data.sellingPrice !== undefined) {
        setSellingPrice(data.sellingPrice);
      } else {
        console.error("Price data not found");
        setSellingPrice(0); // Set to a default value if price is missing
      }

      // Fetch real quantity for the selected size
      const quantityResponse = await fetch(
        `http://localhost:5049/api/ProductSizes/${selectedSize.productSizeID}`
      );
      const quantityData = await quantityResponse.json();
      console.log("Quantity data:", quantityData);
      if (quantityData && quantityData.realQuantity !== undefined) {
        const realQuantity = quantityData.realQuantity;
        console.log("Real quantity:", realQuantity);
        setQuantity(1); // Reset quantity to 1
        if (realQuantity === 0) {
          setIsOutOfStock(true);
        } else {
          setIsOutOfStock(false);
        }
      } else {
        console.error("Error fetching product size realQuantity");
        setIsOutOfStock(true); // Set to out of stock if realQuantity data is not found
      }
    } catch (error) {
      console.error("Error fetching product price or size data:", error);
      setSellingPrice(0); // Reset to 0 or some default value in case of an error
      setIsOutOfStock(true); // Set to out of stock if error occurs
    }
  };

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
          <h3
            className="text-xl italic text-gray-500"
            style={{ fontWeight: "400", fontSize: "1.5rem" }}
          >
            {product.brand || "Product Brand"}
          </h3>

          <p className="text-gray-700">
            {product.description || "No description available."}
          </p>

          {filteredSizes && filteredSizes.length > 0 && (
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
                onChange={(e) => handleSizeChange(e)}
              >
                <option value="">Select size</option>
                {[...filteredSizes]
                  .sort((a, b) => a.size - b.size)
                  .map((size) => (
                    <option
                      key={size.productSizeID}
                      value={JSON.stringify(size)}
                    >
                      EU {size.size} - {size.price} (Stock: {size.realQuantity})
                    </option>
                  ))}
              </select>
            </div>
          )}

          {selectedSize && sellingPrice !== null && !isNaN(sellingPrice) && (
            <div className="mt-4">
              <p className="text-gray-700 font-medium text-xl font-semibold text-red-500">
                Price: ${formatPrice(sellingPrice)}
              </p>
            </div>
          )}

          {selectedSize && (
            <div className="mt-4">
              <p className="text-gray-700 font-medium">
                Stock Available: {selectedSize.realQuantity}
              </p>
              {isOutOfStock && (
                <p className="text-red-500 font-medium">Out of stock</p>
              )}
              <label
                htmlFor="quantity"
                className="block text-gray-700 font-medium mt-2"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={selectedSize.realQuantity}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded-md p-2 w-full"
                disabled={isOutOfStock} // Disable the quantity input if out of stock
              />
              <p className="text-gray-700 mt-2">
                {quantity} / {selectedSize.realQuantity}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center mt-6">
            <button
              className="nds-btn mb3-sm css-dnr0el btn-primary-dark btn-lg"
              onClick={handleAddToCart}
              disabled={isOutOfStock} // Disable the "Add to Cart" button if out of stock
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {modalSuccessOpen && (
        <ModalSucess
          title={modalContent.title}
          message={modalContent.message}
          onClose={() => setModalSuccessOpen(false)}
        />
      )}

      {modalFailureOpen && (
        <ModalFailure
          title={modalContent.title}
          message={modalContent.message}
          onClose={() => setModalFailureOpen(false)}
        />
      )}
      <RecommenderProduct product={product} />
    </div>
  );
}
