"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchOrdersByUserId } from "../../store/actions/orderActions"; // Điều chỉnh đường dẫn nếu cần
import { formatDate } from "../../utils/hooks/useUtil";
import axios from "axios";
import { variables } from "@/utils/api/variables";
import { motion } from "motion/react";

const statusTabs = [
  "Pending",
  "Processing",
  "Shipping",
  "Delivered",
  "Cancelled",
];
const validStatuses = ["Pending", "Processing", "Shipping"];

function Orders({ currentUser }) {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (currentUser?.customerID) {
      dispatch(fetchOrdersByUserId(currentUser.customerID)).then((response) => {
        const sortedOrders = [...response.payload].sort(
          (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
        );
        setOrders(sortedOrders);

        // Lọc các đơn hàng theo trạng thái hợp lệ
        const filtered = sortedOrders.filter((order) =>
          validStatuses.includes(order.status)
        );
        setFilteredOrders(filtered);
      });
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (selectedOrder && !selectedOrder.orderItems) {
          // Chỉ gọi API nếu orderItems chưa được tải
          const response = await axios.get(
            `${variables.ORDERITEM_API}/${selectedOrder.orderID}`
          );
          setSelectedOrder({
            ...selectedOrder,
            orderItems: response.data,
          });
        }
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
    };

    fetchOrderDetails();
  }, [selectedOrder]);
  console.log("Orders: ", filteredOrders);
  const closeModal = () => {
    setSelectedOrder(null);
  };

  const renderStatusNav = (status) => {
    const activeIndex = statusTabs.indexOf(status);

    return (
      <div className="checkout-nav">
        {statusTabs.map((tab, index) => (
          <React.Fragment key={tab}>
            <div
              className={`checkout-tab ${index <= activeIndex ? "active" : ""}`}
            >
              <span className={`${index < activeIndex ? "completed" : ""}`}>
                {index + 1}
              </span>
              <p>{tab}</p>
            </div>
            {index < statusTabs.length - 1 && (
              <div
                className={`checkout-tab-line ${
                  index < activeIndex ? "completed" : ""
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-lg font-bold mb-4">Orders</h1>
      <table className="table-auto w-full text-left border-collapse bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-sm font-medium">ID</th>
            <th className="px-6 py-3 text-sm font-medium">Order Date</th>
            <th className="px-6 py-3 text-sm font-medium">Payment Method</th>
            <th className="px-6 py-3 text-sm font-medium">Total</th>
            <th className="px-6 py-3 text-sm font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr
              key={index}
              className="border-t hover:bg-gray-100 cursor-pointer"
              onClick={() => setSelectedOrder(order)}
            >
              <td className="px-6 py-3 text-sm font-medium text-gray-800">
                {order.orderID}
              </td>
              <td className="px-6 py-3 text-sm text-gray-600">
                {formatDate(order.dateTime)}
              </td>
             
              <td className="px-6 py-3 text-sm text-gray-600">
                {order.paymentType || "N/A"}{" "}
              </td>
              <td className="px-6 py-3 text-sm text-gray-600">
                {order.totalPrice}
              </td>
              <td className="px-6 py-3 text-sm text-gray-600">
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-11/12 max-w-3xl rounded-lg shadow-lg overflow-hidden transform transition-all">
            <div className="flex justify-between items-center bg-gray-100 px-6 py-4 border-b">
              <h2 className="text-lg font-bold text-gray-800">Order Details</h2>
            </div>
            <div className="p-6">
              {renderStatusNav(selectedOrder.status)}
              <div className="mb-4 mt-4">
                <p className="text-sm">
                  <strong className="text-gray-800">Order ID:</strong>{" "}
                  {selectedOrder.orderID}
                </p>
                <p className="text-sm">
                  <strong className="text-gray-800">Order Date:</strong>{" "}
                  {formatDate(selectedOrder.dateTime)}
                </p>
                <p className="text-sm">
                  <strong className="text-gray-800">Status:</strong>{" "}
                  {selectedOrder.status}
                </p>
              </div>

              {/* Thêm chức năng cuộn cho danh sách sản phẩm */}
              <div className="max-h-64 overflow-y-auto">
                <table className="table-auto w-full text-left border-collapse bg-white shadow-md rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-sm font-medium">Product</th>
                      <th className="px-6 py-3 text-sm font-medium">Name</th>
                      <th className="px-6 py-3 text-sm font-medium">Size</th>
                      <th className="px-6 py-3 text-sm font-medium">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-sm font-medium">
                        Unit Price
                      </th>
                      <th className="px-6 py-3 text-sm font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.orderItems.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-6 py-3">
                          <img
                            src={item.product.imageURL}
                            alt={item.product.name}
                            className="h-16 w-16 object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-800">
                          {item.product.name}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-800">
                          {item.productSize.size}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-800">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-800">
                          {parseFloat(item.productSize.price).toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-800">
                          {(
                            item.quantity * item.productSize.price
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end px-6 py-4 border-t bg-gray-50">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => console.log("hover started!")}
                className="px-4 py-2 text-white text-sm font-medium rounded-lg transition"
                onClick={closeModal}
              >
                Close
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
