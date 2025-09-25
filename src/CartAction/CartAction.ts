'use server'
import { getUserToken } from "image/getUserToken"
import { CartData } from "image/types/cart.type"

export async function getCartData() {
  const token: string | null = await getUserToken();
  if (!token) throw new Error('Token Error');

  const res = await fetch(`${process.env.NEXT_PUBLIC_Base_URL}api/v1/cart`, {
    headers: { token }
  });

  const data: CartData = await res.json();
  return data;
}

export async function AddProductToCart(id: string) {
  const token: string | null = await getUserToken();
  if (!token) throw new Error('Token Error');

  const res = await fetch(`${process.env.NEXT_PUBLIC_Base_URL}api/v1/cart`, {
    method: 'POST',
    body: JSON.stringify({ productId: id }),
    headers: { 'content-type': 'application/json', token }
  });

  const data = await res.json();
  return data;
}

export async function RemoveProduct(id: string) {
  const token: string | null = await getUserToken();
  if (!token) throw new Error('Token Error');

  const res = await fetch(`${process.env.NEXT_PUBLIC_Base_URL}api/v1/cart/${id}`, {
    method: 'DELETE',
    headers: { token }
  });

  const data = await res.json();
  return data;
}

export async function clearCart() {
  const token: string | null = await getUserToken();
  if (!token) throw new Error('Token Error');

  const res = await fetch(`${process.env.NEXT_PUBLIC_Base_URL}api/v1/cart`, {
    method: 'DELETE',
    headers: { token }
  });

  const data = await res.json();
  return data;
}

export async function UpdateProductQuantity(id: string, count: number) {
  const token: string | null = await getUserToken();
  if (!token) throw new Error('Token Error');

  const res = await fetch(`${process.env.NEXT_PUBLIC_Base_URL}api/v1/cart/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ count }),
    headers: { 'content-type': 'application/json', token }
  });

  const data = await res.json();
  return data;
}
