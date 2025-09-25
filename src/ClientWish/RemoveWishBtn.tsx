'use client'

import React, { useState } from 'react'
import { RemoveItem } from 'image/WishlistAction/WishlistAction'
import { toast } from 'sonner'


export default function RemoveWishBtn({ id, onRemoved }: { id: string, onRemoved: (id: string) => void }) {
  const [loading, setLoading] = useState(false)

  const handleRemove = async () => {
    try {
      setLoading(true)
      await RemoveItem(id)
      onRemoved(id) 
      toast.success("Removed from Wishlist", { position: "top-center" })
    } catch (err) {
      console.error("Error removing item:", err)
      toast.error("Failed to remove item", { position: "top-center" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <i
      onClick={handleRemove}
      className={`fa-solid fa-trash p-5 text-3xl cursor-pointer transition-colors ${
        loading ? 'opacity-50 cursor-wait' : 'hover:text-red-600'
      }`}
    ></i>
  )
}
