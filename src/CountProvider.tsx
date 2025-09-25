'use client'
import { createContext, useEffect, useState, ReactNode } from "react";
import { getUserToken } from "./getUserToken";
import { getCartData } from "./CartAction/CartAction";
import { CartData } from "./types/cart.type";

interface CountContextType {
  count: number;
  setCount: (value: number) => void;
}


export const CountContext = createContext<CountContextType>({
  count: 0,
  setCount: () => {},
});

export default function CounterProvider({children}: {children: ReactNode}) {
  const [count, setCount] = useState<number>(0);

  async function getToken() {
const token: string | null = await getUserToken();
    if(token) {
      const data: CartData = await getCartData();
      let sum: number = 0;
      data.data.products.forEach((item) => {
        sum += Number(item.count);
      });
      setCount(sum); 
    }
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}
