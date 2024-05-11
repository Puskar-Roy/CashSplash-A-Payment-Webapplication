"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import BaseNavbar from "@repo/ui/navbar";

const Navbar = () => {
  const session = useSession();
  return (
    <div className="overflow-hidde shadow">
      <BaseNavbar
        onSignin={signIn}
        onSignout={signOut}
        sessionStatus={session.status}
        key={session.data?.user?.email}
      />
    </div>
  );
};

export default Navbar;
