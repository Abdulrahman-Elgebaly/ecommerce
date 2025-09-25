'use client'
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#468A9A] text-white py-3 shadow-inner mt-10">
      <div className="max-w-3xl mx-auto flex justify-between items-center px-4">

        <span className="text-sm md:text-base font-semibold">
          © 2025 Abdulrahman Adel
        </span>

   
        <div className="flex space-x-4 text-xl">
          <Link
            href="https://www.linkedin.com/in/abdelrahman-elgebaly-4b264b284"
            target="_blank"
            className="hover:text-blue-200 transition-colors"
          >
            <i className="fa-brands fa-linkedin"></i>
          </Link>
          <Link
            href="https://github.com/Abdulrahman-Elgebaly"
            target="_blank"
            className="hover:text-gray-200 transition-colors"
          >
            <i className="fa-brands fa-github"></i>
          </Link>
        </div>
      </div>
    </footer>
  );
}
