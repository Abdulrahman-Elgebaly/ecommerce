import { getUserToken } from "image/getUserToken"
import { Wishlist } from "image/types/wishlist.type"
import WishlistTable from "image/ClientWish/WishlistTable"

export default async function Page() {
  const token = await getUserToken()
  const res = await fetch(`${process.env.NEXT_PUBLIC_Base_URL}api/v1/wishlist`, {
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
    cache: "no-store",
  })

  const data: Wishlist = await res.json()

  return <WishlistTable initialItems={data.data} />
}
