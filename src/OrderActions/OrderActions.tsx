'use server'

import { getUserToken } from "image/getUserToken"

export async function checkoutPayment(CartId:string,shippingData:{details:string,phone:string,city:string}){
const token: string | null = await getUserToken();
if(token){
    const res =await fetch(`${process.env.NEXT_PUBLIC_Base_URL}api/v1/orders/checkout-session/${CartId}?url=${process.env.NEXT_URL}`,{
        method:'POST',
        body:JSON.stringify({
             "shippingAddress":shippingData
        }),headers:{
            'content-type':'application/json',
            token:token
        }
    })
    const data = await res.json()
    console.log(data);
    return data
}
}

export async function cashOrder(CartId:string,shippingData:{details:string,phone:string,city:string}){
const token: string | null = await getUserToken();
if(token){
    const res =await fetch(`${process.env.NEXT_PUBLIC_Base_URL}api/v1/orders/${CartId}`,{
        method:'POST',
        body:JSON.stringify({
             "shippingAddress":shippingData
        }),headers:{
            'content-type':'application/json',
            token:token
        }
    })
    const data = await res.json()
    console.log(data);
    return data
}}