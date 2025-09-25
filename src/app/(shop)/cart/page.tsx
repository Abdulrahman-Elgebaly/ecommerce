"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  clearCart,
  getCartData,
  RemoveProduct,
  UpdateProductQuantity,
} from "image/CartAction/CartAction";
import { cart, CartData } from "image/types/cart.type";
import Image from "next/image";
import Skeleton from "image/app/_components/Skeleton/Skeleton";
import { toast } from "sonner";
import { CountContext } from "image/CountProvider";
import Link from "next/link";

export default function Cart() {
  const {setCount}= useContext(CountContext)
  const [currentId, setId] = useState<string>();
  const [cartLoading, setLoading] = useState(true);
  const [countLoading, setLoadingCount] = useState(false);
  const [countDisable, setDisable] = useState(false);
  const [cartItem, setItem] = useState<cart>();
  useEffect(() => {
    getAllCartData();
  }, []);

  async function getAllCartData() {
    setLoading(true);
    const data: CartData = await getCartData();
    setItem(data.data);
    setLoading(false);
      let sum:number = 0
     data.data.products.forEach((item)=>{
             sum+= Number(item.count)
                  setCount(sum)
            })
            setCount(sum)
  }

  async function handelRemove(id: string) {
    const data = await RemoveProduct(id);
    console.log(data);
    if (data.status == "success") {
      toast.success("Product Deleted", { position: "top-center" });
      setItem(data.data);
    }
  }

  async function handelClear() {
    const data = await clearCart();
    console.log(data);
    if (data.message == "success") {
      toast.success("Clear", { position: "top-center" });
      getAllCartData();
      setCount(0)
    }
  }
  async function handelAddQuantity(id: string, count: number) {
    setId(id);
    setLoadingCount(true);
    setDisable(true);
    const data = await UpdateProductQuantity(id, count);
    console.log(data);
    if (data.status == "success") {
      setItem(data.data);
       let sum:number = 0
     data.data.products.forEach((item: { count: number }) => {
             sum+= Number(item.count)
                  setCount(sum)
            })
            setCount(sum)
    }
    setLoadingCount(false);
    setDisable(false);
    
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold">Shop Cart</h1>
        <Button onClick={handelClear} className="bg-red-600">
          Clear Cart
        </Button>
      </div>

      {cartLoading ? (
        <Skeleton />
      ) : (
        <>
          {cartItem?.totalCartPrice != 0 ? (
         <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark my-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span>Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cartItem?.products.map((item) => {
                    return (
                      <tr
                        key={item._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <Image
                            src={item.product.imageCover}
                            width={100}
                            height={100}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt={item.product.title}
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.product.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Button
                              disabled={countDisable}
                              onClick={() => {
                                handelAddQuantity(
                                  item.product._id,
                                  (item.count -= 1)
                                );
                              }}
                              className="cursor-pointer inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Quantity button</span>
                              {item.count == 1 ? (
                                <i className="fa-solid fa-trash "></i>
                              ) : (
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 2"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h16"
                                  />
                                </svg>
                              )}
                            </Button>
                            <div>
                              {countLoading && currentId == item.product._id ? (
                                <i className="fa-solid fa-spinner fa-spin"></i>
                              ) : (
                                <span>{item.count}</span>
                              )}
                            </div>
                            <Button
                              disabled={countDisable}
                              onClick={() => {
                                handelAddQuantity(
                                  item.product._id,
                                  (item.count += 1)
                                );
                              }}
                              className=" cursor-pointerinline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </Button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.price}
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            onClick={() => {
                              handelRemove(item.product._id);
                            }}
                            className="bg-red-500 text-white"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th colSpan={3} className="px-16 py-3 ">
                      <span>Total price</span>
                    </th>
                    <th colSpan={2} className="px-6 py-3">
                      <span>{cartItem?.totalCartPrice} EGP</span>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          <Button className="btn-color mx-4 float-end">  <Link href={`/CheckoutSession/${cartItem?._id}`}>Online Payment </Link></Button>
          <Button className="btn-color float-end">  <Link href={`/CashOrder/${cartItem?._id}`}>Cash on Delivery</Link></Button>
         <div className="clear-both"></div>
         </>
      
          ) : (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 my-5"
              role="alert"
            >
              <span className="font-medium">Add some products! </span>Your Cart
              is Empty .
            </div>
          )}
        </>
      )}
    </>
  );
}









