import React from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export default function Button() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("session", session);

  return (
    <div>
      {session ? (
        <button className="px-4 py-2 border" onClick={() => signOut()}>
          Log out
        </button>
      ) : (
        <button
          className="px-4 py-2 border"
          onClick={() => {
            router.push("/signin");
          }}
        >
          Sign in
        </button>
      )}
    </div>
  );
}
