"use client";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import { cn } from "image/lib/utils";
import { useContext } from "react";
import { CountContext } from "image/CountProvider";

export function Navbar() {
  const {count,setCount}= useContext(CountContext)
  const { data, status } = useSession();

  
  const MenuItems: { path: string, content: string,Protected:boolean  }[] = [
    { path: "/products", content: "Products" , Protected:false },
    { path: "/category", content: "Category", Protected:false},
    { path: "/brands", content: "Brands", Protected:false },

    { path: "/wishlist", content: "Wishlist", Protected:false },
        // { path: "/cart", content: "Cart", Protected:true },
    { path: "/allorders", content: "Orders", Protected:true },
  ];
  const MenuAuthItems: { path: string; content: string }[] = [
    { path: "/login", content: "Login" },
    { path: "/register", content: "Register" },
  ];

function logout(){
  signOut({
    callbackUrl:'/login'
  })
}

  return (
    <NavigationMenu
      viewport={false}
      className="max-w-full justify-between shadow-2xl p-5 mb-5"
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={"/"}>
              <Image width={40} height={40} src={"/logo.png"} alt="logo" />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {MenuItems.map((el) => {
          return (
            <NavigationMenuItem key={el.path}>
             {el.Protected && status=='authenticated'&& <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={el.path}>{el.content}</Link>
              </NavigationMenuLink>}
              {!el.Protected&& <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={el.path}>{el.content}</Link>
              </NavigationMenuLink>}
            </NavigationMenuItem>
          );
        })}
   {
    status == 'authenticated' &&      <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle())}>
      <Link href={'/cart'} className="relative">Cart
            <span className="absolute -top-0.5  -right-0.5 w-5 h-5  rounded-full bg-amber-400 flex justify-center items-center">{count}</span>
</Link>
        </NavigationMenuLink>
   }

      </NavigationMenuList>
      <NavigationMenuList>
          {status == 'authenticated'?<>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <span className=" text-black">hello <span className="category-color "> {data?.user?.name}</span></span>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem> 
          <NavigationMenuLink  onClick={logout} asChild className={navigationMenuTriggerStyle()}>
            <span>
              <i className="fa-solid fa-right-from-bracket"></i>
            </span>
          </NavigationMenuLink>
        </NavigationMenuItem>
</>:  <>
      
        {MenuAuthItems.map((el) => {
          return (
            <NavigationMenuItem key={el.path}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={el.path}>{el.content}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
        </>}

      


      </NavigationMenuList>
    </NavigationMenu>
  );
}
