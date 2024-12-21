import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchOrdersByUserId } from "../../store/actions/orderActions"; // Điều chỉnh đường dẫn nếu cần
import {
  useStatusString,
  formatDate,
  formatDateTime,
} from "../../utils/hooks/useUtil";
import { variables } from "@/utils/api/variables";

export default function HistoryOrder({ currentUser }) {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrdersByUserId(currentUser.customerID)).then((response) => {
      // Sort orders by date
      const sortedOrders = [...response.payload].sort(
        (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
      );
      setOrders(sortedOrders);

      // Filter orders by status
      const validStatuses = ["Shipped", "Delivered", "Cancelled"];
      const historyOrders = sortedOrders.filter((order) =>
        validStatuses.includes(order.status)
      );
      setFilteredOrders(historyOrders);
    });
  }, [dispatch]);

  useEffect(() => {
    if (selectedOrder) {
      const fetchOrderDetails = async () => {
        const response = await axios.get(
          `${variables.ORDERITEM_API}/ByOrder/${selectedOrder.orderID}`
        );
        setSelectedOrder({
          ...selectedOrder,
          orderItems: response.data,
        });
      };

      fetchOrderDetails();
    }
  }, [selectedOrder]);

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4 text-gray-800">History Orders</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">
                ID
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">
                Order Date
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.orderID}
                className="border-t hover:bg-gray-100 cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <td className="px-6 py-3 text-sm font-medium text-gray-800">
                  {order.orderID}
                </td>
                <td className="px-6 py-3 text-sm text-gray-600">
                  {formatDateTime(order.dateTime)}
                </td>
                <td className="px-6 py-3 text-sm text-gray-600">
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Popup for Selected Order */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-11/12 max-w-3xl rounded-lg shadow-lg overflow-hidden transform transition-all">
            <div className="flex justify-between items-center bg-gray-100 px-6 py-4 border-b">
              <h2 className="text-lg font-bold text-gray-800">Order Details</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
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
              <table className="table-auto w-full text-left border-collapse bg-white shadow-md rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">
                      Product
                    </th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">
                      Name
                    </th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">
                      Size
                    </th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">
                      Unit Price
                    </th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">
                      Total
                    </th>
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
                        {parseFloat(
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
            <div className="flex justify-end px-6 py-4 border-t bg-gray-50">
              <button
                className="px-4 py-2  text-white text-sm font-medium rounded-lg transition"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
