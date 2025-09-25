"use client";

import React, { useState, useContext } from "react";
import { toast } from "sonner"; 
import { AddProductToCart } from "image/CartAction/CartAction";
import { RemoveItem } from "image/WishlistAction/WishlistAction";
import { CountContext } from "image/CountProvider";


interface MoveToCartBtnProps {
  id: string;
  onRemove: (id: string) => void;
}

export default function MoveToCartBtn({ id, onRemove }: MoveToCartBtnProps) {
  const [loading, setLoading] = useState(false);
  const { count, setCount } = useContext(CountContext);

  const handleMove = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await AddProductToCart(id);
      toast.success("Added to Cart", { position: "top-center" });

      await RemoveItem(id);
      onRemove(id);

      setCount(count + 1); 
    } catch (err) {
      toast.error("Something went wrong!", { position: "top-center" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleMove}
      disabled={loading}
      className={`btn-color text-white px-4 py-2 rounded-lg cursor-pointer ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Moving..." : "Move to Cart"}
    </button>
  );
}
