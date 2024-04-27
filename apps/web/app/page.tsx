"use client";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Page(): JSX.Element {
  const session = useSession();
  console.log(session);

  return (
    <main className="h-screen flex items-center ">
      <div className="text-center w-[20%] mx-auto flex flex-col gap-[50px]">
        <h1 className="text-4xl text-blue-500 font-semibold">Hello</h1>
        {session?.data?.user?.email && (
          <h2>
            <span className="text-lg font-bold">Phone No - </span>
            {session?.data?.user?.email}
          </h2>
        )}

        {session.status === "unauthenticated" ? (
          <div
            className="bg-blue-500 p-3 rounded-xl text-white cursor-pointer"
            onClick={() => signIn()}
          >
            Login
          </div>
        ) : (
          <div
            className="bg-blue-500 p-3 rounded-xl text-white cursor-pointer"
            onClick={() => signOut()}
          >
            Logout
          </div>
        )}
      </div>
    </main>
  );
}
