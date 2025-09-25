'use client'

import React from 'react'
import { AddItem } from 'image/WishlistAction/WishlistAction'
import { toast } from 'sonner'

export default function ClientWish({ id }: { id: string }) {
  const handleClick = async () => {
    try {
      await AddItem(id)  
      toast.success("Added to Wishlist",{position:"top-center"})
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message, { position: "top-center" });
      } else {
        toast.error("Something went wrong", { position: "top-center" });
      }
    }
  }

  return (
    <i
      onClick={handleClick}
      className="fa-solid fa-heart absolute end-1.5 top-1.5 text-3xl cursor-pointer hover:text-red-500 transition-colors"
    ></i>
  )
}
