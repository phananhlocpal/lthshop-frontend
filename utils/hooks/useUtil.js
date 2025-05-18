'use client';
import { useState } from 'react';

export const useStatusString = () => {
    return (status) => {
      const statusMap = {
        0: { statusString: 'Pending', className: 'yellow' },
        1: { statusString: 'Processing', className: 'green' },
        2: { statusString: 'Shipped', className: 'green' },
        3: { statusString: 'Delivered', className: 'green' },
        4: { statusString: 'Cancelled', className: 'red' }
      };
      const statusObj = statusMap[status] ?? { statusString: '', className: '' };
      return <p className={`txt ${statusObj.className}`}>{statusObj.statusString}</p>;
    };
};

export const useStock = () => {
  return (stock) => {
    const stockMap = {
      true: { statusString: 'In stock', className: 'green' },
      false: { statusString: 'Out of stock', className: 'red' },
    };
    const stockObj = stockMap[stock] ?? { statusString: '', className: '' };
    return <p className={`txt ${stockObj.className}`}>{stockObj.statusString}</p>;
  };
};

export default function useToggle(initialValue = false) {
  const [toggled, setToggled] = useState(initialValue);

  function toggle() {
    setToggled(!toggled);
  }

  function isToggled() {
    return toggled;
  }

  return { toggle, isToggled };
}

export const formatPrice = (price) => {
  // If the price is a string (e.g. "60 ₫"), extract the numeric part
  if (typeof price === 'string') {
    // Remove any non-numeric characters and convert to a number
    price = parseFloat(price.replace(/[^\d.-]/g, ''));
  }

  // Check if the price is a valid number
  if (typeof price !== 'number' || isNaN(price)) {
    console.error('Invalid price value:', price);  // Log invalid price
    return 'N/A';  // Return a default value like 'N/A' if invalid
  }

  // Format the price using toLocaleString for Vietnamese currency
  return price.toLocaleString('vi-VN', { 
    style: 'currency', 
    currency: 'VND', 
    minimumFractionDigits: 0,  // Don't show decimals
    maximumFractionDigits: 0   // Don't show decimals
  });
};

export function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('us-US', options);
}

export function formatDateTime(dateTime) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return new Date(dateTime).toLocaleDateString('us-US', options);
}