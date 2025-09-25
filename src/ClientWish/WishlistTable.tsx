"use client";

import React, { useState } from "react";
import Image from "next/image";
import { item } from "image/types/wishlist.type";
import { RemoveItem } from "image/WishlistAction/WishlistAction";
import { toast } from "sonner";
import MoveToCartBtn from "./MoveToCartBtn";
import Skeleton from "image/app/_components/Skeleton/Skeleton";

interface WishlistTableProps {
  initialItems: item[];
}

export default function WishlistTable({ initialItems }: WishlistTableProps) {
  const [items, setItems] = useState<item[]>(initialItems);
  const [loading, setLoading] = useState(false);

  const handleRemove = async (id: string) => {
    try {
      setLoading(true);
      await RemoveItem(id);
      setItems(prev => prev.filter(item => item._id !== id));
      toast.success("Removed from Wishlist", { position: "top-center" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    } finally {
      setLoading(false);
    }
  };

  if (!items.length && !loading) return <p className="text-center p-5">Wishlist is empty</p>;
  if (loading) return <Skeleton />;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-16 py-3">Image</th>
            <th className="px-6 py-3">Product</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Action</th>
            <th className="px-6 py-3">Remove</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr
              key={item._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="p-4">
                <Image src={item.imageCover} width={100} height={100} alt={item.brand.name} />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{item.title}</td>
              <td className="px-6 py-4 text-black">
                {new Date(item.createdAt).toLocaleString("en-EG", { dateStyle: "medium", timeStyle: "short" })}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{`${item.price} EGP`}</td>
              <td className="px-6 py-4">
                <MoveToCartBtn
                  id={item._id}
                  onRemove={(id) => setItems(prev => prev.filter(i => i._id !== id))}
                />
              </td>
              <td className="px-6 py-4">
                <i
                  onClick={() => handleRemove(item._id)}
                  className="fa-solid fa-trash p-5 text-3xl cursor-pointer hover:text-red-600 transition"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
