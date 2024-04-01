'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const {data :session} = useSession();

  return (
    <>
    <button className="flex justify-center px-2 py-1 bg-blue-100 hover:bg-blue-400" onClick={() => signIn("google",{callbackUrl:"/idea"})}> 
      Login With Google
    </button>
    </>
  );
}