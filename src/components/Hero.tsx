import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import MyBtn from "./Mybutton";
import router from "next/router";

interface Props {
  heading: string;
  message: string;
}

const Hero = ({ heading, message }: Props) => {
  const { status } = useSession();
  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center h-screen bg-fixed bg-center bg-cover custom-img">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]" />
      <div className="p-5 text-white z-[2] mt-[-10rem]">
        <h2 className="text-5xl font-bold">Welcome to</h2>
        <h2 className="text-5xl font-bold">DA-Inventory System</h2>
        <p className="py-5 text-2xl">Please Sign-in...</p>
        <div className="w-32" onClick={() => {router.push("/signin");}}>
            <MyBtn  textContent={"Sign-in"} />
        </div>
      </div>
    </div>
    )

  }


  return (
    <div className="flex items-center justify-center h-screen bg-fixed bg-center bg-cover custom-img">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]" />
      <div className="p-5 text-white z-[2] mt-[-10rem]">
        <h2 className="text-5xl font-bold">{heading}</h2>
        <p className="py-5 text-xl">{message}</p>
        <div className="w-32" onClick={() => {router.push("/services");}}>
            <MyBtn  textContent={"Here"} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
