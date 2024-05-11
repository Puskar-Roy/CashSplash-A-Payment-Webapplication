"use client";
import React, { useState } from "react";
import { MdOutlineMenu, MdOutlineClose } from "react-icons/md";
import { signIn, signOut, useSession } from "next-auth/react";
import BaseNavbar from "@repo/ui/navbar";

const Navbar = () => {
  const session = useSession();
  return (
    <BaseNavbar
      onSignin={signIn}
      onSignout={signOut}
      sessionStatus={session.status}
      name={session.data?.user?.email}
      key={session.data?.user?.email}
    />
  );
};

export default Navbar;
