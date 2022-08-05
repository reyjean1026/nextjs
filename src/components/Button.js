import React from 'react'
import {useRouter} from 'next/router'
import { signOut, useSession } from "next-auth/react";

export default function Button() {

  const router = useRouter()
  const { data: session } = useSession()
  console.log("session", session);

  return (
    <div className='bg-cyan-400 text-white font-medium py-2 px-6 rounded-md hover:bg-cyan-500 duration-300 w-fit cursor-pointer mt-6 md:ml-8 md:mt-0'>
           {session ? (
          <button onClick={() => signOut()}>Log out</button>
        ) : (
          <button
            onClick={() => {
              router.push("/signin");
            }}
          >
            Sign in
          </button>
        )}
    </div>
  )
}