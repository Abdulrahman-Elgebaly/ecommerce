"use client";
import Skeleton from "image/app/_components/Skeleton/Skeleton";
import { order, AllOrders } from "image/types/orders.type";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState<order[]>([]);
  const [loading, setLoading] = useState(true);

  async function getAllOrders() {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_Base_URL}api/v1/orders/`
      );
      const data: AllOrders = await res.json();
      const myOrders = data.data;
      setOrders(myOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-center text-white text-2xl sm:text-4xl p-4 btn-color w-full mb-5">
         Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-left text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Order ID</th>
                  <th className="p-2 border">Customer</th>
                  <th className="p-2 border">Total Price</th>
                  <th className="p-2 border">Payment</th>
                  <th className="p-2 border">Paid</th>
                  <th className="p-2 border">Delivered</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t">
                    <td className="p-2 border">{order.id}</td>
                    <td className="p-2 border">{order.user?.name}</td>
                    <td className="p-2 border">{order.totalOrderPrice} EGP</td>
                    <td className="p-2 border">{order.paymentMethodType}</td>
                    <td className="p-2 border">{order.isPaid ? "✅" : "❌"}</td>
                    <td className="p-2 border">
                      {order.isDelivered ? "✅" : "❌"}
                    </td>
                    <td className="p-2 border">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border p-4 rounded-lg shadow-sm bg-white"
              >
                <h2 className="font-semibold mb-2 text-lg">
                  Order #{order.id}
                </h2>
                <ul className="list-disc ml-4 text-sm">
                  {order.cartItems.map((item) => (
                    <li key={item._id}>
                      {item.count}x {item.product.title} - {item.price} EGP
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
