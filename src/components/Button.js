import React from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import MyBtn from "./Mybutton"

export default function Button() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <div onClick={() => signOut()}>
           <MyBtn  textContent={"Signout"} />
        </div>
       
      ) : (
        <div onClick={() => {router.push("/signin");}}>
            <MyBtn  textContent={"Sign-in"} />
        </div>
    
      )}
    </div>
  );
}
