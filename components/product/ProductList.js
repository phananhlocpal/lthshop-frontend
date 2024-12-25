'use client'
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductItem';
import { useProduct } from '../../utils/hooks/useProduct';
import { useSelector } from 'react-redux';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import useToggle from '../../utils/hooks/useUtil';
import Spinder from '../spinder/Spinder';

function ProductList() {
  const { toggle, isToggled } = useToggle();
  const [isLoading, setIsLoading] = useState(true);
  const { products, fetchProducts } = useProduct();
  const { minPrice: filterMinPrice, maxPrice: filterMaxPrice } = useSelector((state) => state.product.filter);

  const [minPrice, setMinPrice] = useState(filterMinPrice || '');
  const [maxPrice, setMaxPrice] = useState(filterMaxPrice || '');
  const [sortOrder, setSortOrder] = useState('asc');
  const [size, setSize] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading

    return () => clearTimeout(timer); // Clear timer on component unmount
  }, []);
  if (isLoading) {
    return <Spinder />;
  }
  const filteredProducts = products
    .filter((product) => {
      const minPriceFilter = minPrice === '' || product.defaultPrice >= parseFloat(minPrice);
      const maxPriceFilter = maxPrice === '' || product.defaultPrice <= parseFloat(maxPrice);
      const sizeFilter = size === '' || product.sizes.map((ps) => ps.size).includes(parseInt(size));
      return minPriceFilter && maxPriceFilter && sizeFilter;
    })
    .sort((a, b) => {
      if (sortOrder === 'lowToHigh') {
        return a.defaultPrice - b.defaultPrice;
      } else if (sortOrder === 'highToLow') {
        return b.defaultPrice - a.defaultPrice;
      } else {
        return 0;
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (startPage > 1) pageNumbers.unshift('...');
    if (endPage < totalPages) pageNumbers.push('...');

    if (!pageNumbers.includes(1)) pageNumbers.unshift(1);
    if (!pageNumbers.includes(totalPages)) pageNumbers.push(totalPages);

    return pageNumbers;
  };

  const handlePageChange = (page) => {
    if (page === '...') return;
    setCurrentPage(page);
  };

  return (
    <div className='shop'>
      <div className='product-grid'>
        {displayedProducts.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
              </span>{' '}
              of <span className="font-medium">{filteredProducts.length}</span> results
            </p>
          </div>
          <div>
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-md shadow-sm mt-4"
            >
              <a
                href="#"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
              </a>
              {getPageNumbers().map((page, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={() => handlePageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    page === currentPage
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </a>
              ))}
              <a
                href="#"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
