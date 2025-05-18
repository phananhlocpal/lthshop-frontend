"use client";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, calculateSubtotal, getTotal, applyDiscount, clearCart, loadCart, setSubTotal, setTotal } from '../../store/reducers/cartSlice';
import { formatPrice } from '../hooks/useUtil';
import { selectCurrentUser } from '../../store/reducers/userSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const subtotal = useSelector(state => state.cart.subtotal);
  const delivery = useSelector(state => state.cart.delivery);
  const discount = useSelector(state => state.cart.discount);
  const total = useSelector(state => state.cart.total);
  const [productPrices, setProductPrices] = useState({});
  const quantity = items.reduce((acc, item) => acc + item.quantity, 0);

  console.log("items", items);

  const currentUser = useSelector(selectCurrentUser);



  useEffect(() => {
    dispatch(loadCart(currentUser));  
  }, [dispatch, currentUser]);

  useEffect(() => {
    dispatch(calculateSubtotal());
  }, [items, dispatch, quantity]);

  useEffect(() => {
    dispatch(getTotal());
  }, [subtotal, delivery, dispatch, discount]);

  useEffect(() => {
    const fetchProductPrices = async () => {
      const priceData = {};
      for (const item of items) {
        try {
          const response = await fetch(`http://localhost:5049/api/ProductPrices/${item.productSizeID}`);
          const data = await response.json();
          if (data && data.sellingPrice) {
            priceData[item.productSizeID] = data.sellingPrice; // Store the price for each productSizeID
          }
        } catch (error) {
          console.error("Error fetching product price:", error);
        }
      }
      setProductPrices(priceData); // Update the prices after fetching
    };

    fetchProductPrices();
  }, [items]);

  // Calculate subtotal using the fetched product prices
  useEffect(() => {
    const calculatedSubtotal = items.reduce((acc, item) => {
      const price = productPrices[item.productSizeID] || 0;
      return acc + (price * item.quantity);
    }, 0);

    // Update subtotal in Redux
    dispatch(setSubTotal(calculatedSubtotal));
    // Calculate and update total
    const discountAmount = discount > 0 ? calculatedSubtotal * discount : 0;
    const calculatedTotal = calculatedSubtotal - discountAmount;
    dispatch(setTotal(calculatedTotal));
  }, [items, productPrices, discount, delivery, dispatch]);
  const addToCartHandler = (item) => {
    dispatch(addToCart({ cartItemID: item.cartItemID,  product: item.product, productPrice: item.productPrice, productSizeID: item.productSizeID, productSize: item.productSize, quantity: item.quantity, currentUser: currentUser }));
  };
  
  const removeFromCartHandler = (itemId, size) => {
    const item = items.find((item) => item.product.productID === itemId && item.productSize === size); 
    console.log(item)
    dispatch(removeFromCart({ cartItemID: item.cartItemID, productID: itemId, productSize: size, currentUser: currentUser }));
  };
  
  const updateQuantityHandler = (updatedItem) => {
    if (updatedItem.quantity === 0) {
      const item = items.find((item) => item.product.productID === updatedItem.product.productID && item.productSize === updatedItem.productSize);
      if (item) {
        dispatch(removeFromCart({ cartItemID: updatedItem.cartItemID, productID: updatedItem.product.productID, productSize: updatedItem.productSize, currentUser: currentUser}));
      }
    } else if (updatedItem.quantity > 0) {
      dispatch(updateQuantity({ cartItemID: updatedItem.cartItemID, product: updatedItem.product, productPrice: updatedItem.productPrice, productSizeID: updatedItem.productSizeID, productSize: updatedItem.productSize, quantity: updatedItem.quantity, currentUser: currentUser }));
    }
  };

  const clearCartHandler = () => {
    dispatch(clearCart({currentUser}));
  };

  const applyDiscountHandler = (discountCode) => {
    const discount = 0.1;
    if(discountCode.toLowerCase() === "10off"){
      dispatch(applyDiscount({ discount }));
    } else{
      alert("Wrong discount")
    }
  }; 

  return { 
    addToCart: addToCartHandler, 
    removeFromCart: removeFromCartHandler, 
    updateQuantity: updateQuantityHandler, 
    clearCart: clearCartHandler, 
    applyDiscount: applyDiscountHandler,
    items, 
    defaultSubtotal: subtotal,
    defaultTotal: total, 
    subtotal, 
    delivery: formatPrice(delivery), 
    total, 
    quantity,
    discount
  };
};



