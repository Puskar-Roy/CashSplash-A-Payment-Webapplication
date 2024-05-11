"use client";
import React, { useState } from "react";
import { MdOutlineMenu, MdOutlineClose } from "react-icons/md";
import { signIn, signOut, useSession } from "next-auth/react";
const Navbar = () => {
  const [toggle, setToggle] = useState<boolean>(false);
    const session = useSession();
  const changeToggle = () => {
    setToggle(!toggle);
  };
  return (
    <header className="w-screen shadow-xl rounded-xl">
      <nav className="w-[80%] mx-auto flex justify-between py-8">
        <div className="text-blue-500 font-semibold text-3xl">CashSplash</div>
        <ul onClick={changeToggle} className="sm:hidden">
          {toggle ? (
            <MdOutlineClose className="text-4xl cursor-pointer" />
          ) : (
            <MdOutlineMenu className="text-4xl cursor-pointer" />
          )}
        </ul>
        <ul className="hidden  sm:flex justify-center items-center gap-10">
          <li className="text-lg font-medium cursor-pointer hover:text-blue-500">
            Home
          </li>
          <li className="text-lg font-medium cursor-pointer hover:text-blue-500">
            About
          </li>
          <li className="text-lg font-medium cursor-pointer hover:text-blue-500">
            Contact
          </li>
          {session.status === "unauthenticated" ? (
            <li
              className="text-base font-medium cursor-pointer px-3 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-400"
              onClick={() => signIn()}
            >
              Login
            </li>
          ) : (
            <li
              className="text-base font-medium cursor-pointer px-3 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-400"
              onClick={() => signOut()}
            >
              Logout
            </li>
          )}
        </ul>
      </nav>
      <ul
        className={
          toggle
            ? `w-screen absolute  text-center flex sm:hidden flex-col gap-10 p-10 bg-blue-50 rounded`
            : "hidden"
        }
      >
        <li className="text-lg font-medium cursor-pointer hover:text-blue-500">
          Home
        </li>
        <li className="text-lg font-medium cursor-pointer hover:text-blue-500">
          About
        </li>
        <li className="text-lg font-medium cursor-pointer hover:text-blue-500">
          Contact
        </li>
        {session.status === "unauthenticated" ? (
          <li
            className="text-lg font-medium cursor-pointer p-3 bg-blue-500 rounded-xl text-white hover:bg-blue-400"
            onClick={() => signIn()}
          >
            Login
          </li>
        ) : (
          <li
            className="text-lg font-medium cursor-pointer p-3 bg-blue-500 rounded-xl text-white hover:bg-blue-400"
            onClick={() => signOut()}
          >
            Logout
          </li>
        )}
      </ul>
    </header>
  );
};

export default Navbar;
