"use client";
import { useSession } from "next-auth/react";
export default function Page(): JSX.Element {
  const session = useSession();
  console.log(session);

  return (
    <main className="h-screen flex items-cente">
      {session?.data?.user?.email}
    </main>
  );
}
