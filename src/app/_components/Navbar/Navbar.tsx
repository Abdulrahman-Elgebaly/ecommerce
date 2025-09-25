"use client";
import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import { cn } from "image/lib/utils";
import { CountContext } from "image/CountProvider";
import { FaBars, FaTimes } from "react-icons/fa";

export function Navbar() {
  const { count } = useContext(CountContext);
  const { data, status } = useSession();
  const [isOpen, setIsOpen] = useState(false); // للتحكم في فتح القائمة في الموبايل

  const MenuItems: { path: string; content: string; Protected: boolean }[] = [
    { path: "/products", content: "Products", Protected: false },
    { path: "/category", content: "Category", Protected: false },
    { path: "/brands", content: "Brands", Protected: false },
    { path: "/wishlist", content: "Wishlist", Protected: false },
    { path: "/allorders", content: "Orders", Protected: true },
  ];

  const MenuAuthItems: { path: string; content: string }[] = [
    { path: "/login", content: "Login" },
    { path: "/register", content: "Register" },
  ];

  function logout() {
    signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <nav className="shadow-2xl mb-5 p-5 bg-white">
      <div className="flex justify-between items-center max-w-full">
        {/* Logo */}
        <Link href="/">
          <Image width={40} height={40} src="/logo.png" alt="logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          {MenuItems.map((el) => {
            if (el.Protected && status !== "authenticated") return null;
            return (
              <Link
                key={el.path}
                href={el.path}
                className={navigationMenuTriggerStyle()}
              >
                {el.content}
              </Link>
            );
          })}

          {status === "authenticated" && (
            <Link href="/cart" className="relative">
              Cart
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 flex justify-center items-center text-xs">
                {count}
              </span>
            </Link>
          )}
        </div>

        {/* Auth / User Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          {status === "authenticated" ? (
            <>
              <span className="text-black">
                hello <span className="category-color">{data?.user?.name}</span>
              </span>
              <button onClick={logout}>
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </>
          ) : (
            MenuAuthItems.map((el) => (
              <Link
                key={el.path}
                href={el.path}
                className={navigationMenuTriggerStyle()}
              >
                {el.content}
              </Link>
            ))
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2">
          {MenuItems.map((el) => {
            if (el.Protected && status !== "authenticated") return null;
            return (
              <Link key={el.path} href={el.path} className={navigationMenuTriggerStyle()}>
                {el.content}
              </Link>
            );
          })}

          {status === "authenticated" && (
            <Link href="/cart" className="relative">
              Cart
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 flex justify-center items-center text-xs">
                {count}
              </span>
            </Link>
          )}

          {status === "authenticated" ? (
            <>
              <span className="text-black">
                hello <span className="category-color">{data?.user?.name}</span>
              </span>
              <button onClick={logout} className={navigationMenuTriggerStyle()}>
                Logout
              </button>
            </>
          ) : (
            MenuAuthItems.map((el) => (
              <Link key={el.path} href={el.path} className={navigationMenuTriggerStyle()}>
                {el.content}
              </Link>
            ))
          )}
        </div>
      )}
    </nav>
  );
}
