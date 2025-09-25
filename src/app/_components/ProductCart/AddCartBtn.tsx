"use client";

import { AddProductToCart } from "image/CartAction/CartAction";
import { Button } from "image/components/ui/button";
import { CountContext } from "image/CountProvider";
import { useContext } from "react";
import { toast } from "sonner";

export default function AddCartBtn({ id }: { id: string }) {
  const { setCount } = useContext(CountContext);
  async function addProduct(id: string) {
   try{
     const data = await AddProductToCart(id);
    if (data.status == "success") {
      toast.success(data.message, { position: "top-center" });
      let sum: number = 0;
  data.data.products.forEach((item: { count: number }) => {
        sum += Number(item.count);
        setCount(sum);
      });
      setCount(sum);
    } else {
      toast.error(data.message, { position: "top-center" });
    }
   }catch(err){
    toast.error('Login First',{position:'top-center'})
    
   }

  }
  return (
    <Button
      onClick={() => {
        addProduct(id);
      }}
      className="w-full rounded-3xl btn-color cursor-pointer mt-3"
    >
      Add To Cart
    </Button>
  );
}
