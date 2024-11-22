"use client";

import Link from "next/link";
import React from "react";
import { useCart } from "../../context/cartContext";

const Navbar = () => {
  const { cart } = useCart();

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img className="w-9" src="/icons/shop.svg"></img>
          <span className="ml-3 text-xl">MyShop</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/" className="mr-5 hover:text-gray-900">
            Home
          </Link>
          <Link href="/about" className="mr-5 hover:text-gray-900">
            About
          </Link>
          <Link href="/product" className="mr-5 hover:text-gray-900">
            Product
          </Link>
          <Link href="/contact" className="mr-5 hover:text-gray-900">
            Contact Us
          </Link>
          <Link href="/checkout" className="mr-5 hover:text-gray-900">
            Cart({cart.length})
          </Link>
        </nav>
        <button className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded">
          Login
        </button>
      </div>
    </header>
  );
};

export default Navbar;
