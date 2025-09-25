'use server'

import { getUserToken } from "image/getUserToken"


export async function RemoveItem(id:string) {
    const token= await getUserToken()
    const res =await fetch(`${process.env.NEXT_PUBLIC_Base_URL}api/v1/wishlist/${id}`,{
        method:'DELETE',
        headers:{
            token:token as string
        }
    })
    const data = await res.json()
}


export async function AddItem(productId:string) {
    const token= await getUserToken()
    const res =await fetch(`${process.env.NEXT_PUBLIC_Base_URL}api/v1/wishlist`,{
        method:"POST",
         headers: {
    "Content-Type": "application/json",
    token: token as string
  },  body: JSON.stringify({
    productId: productId
  }),
    })
const data = await res.json()

}