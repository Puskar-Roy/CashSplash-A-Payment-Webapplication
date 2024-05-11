"use client";
import { useSession } from "next-auth/react";
export default function Page(): JSX.Element {
  const session = useSession();
  console.log(session);

  return (
    <main className="h-screen flex items-center ">
      <div className="text-center w-[20%] mx-auto flex flex-col gap-[50px]">
        {session?.data?.user?.email && (
          <h2>
            <span className="text-lg font-bold">Phone No - </span>
            {session?.data?.user?.email}
          </h2>
        )}

      </div>
    </main>
  );
}
