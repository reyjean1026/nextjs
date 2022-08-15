import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/router";
import Button from "./Button";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [navBg, setNavBg] = useState("transparent");
  const [linkColor, setLinkColor] = useState("#1f2937");
  const [shadow, setShadow] = useState(true);
  const handleNav = () => {
    setNav(!nav);
  };
  const { data: session } = useSession();

  const router = useRouter();

  const navLinks =
  [
  { 'name': 'Services', 'path': '/services' },
  { 'name': 'Pricing', 'path': '/pricing' },
]

  useEffect(() => {
    if (router.asPath === "/") {
      setNavBg("transparent");
      setLinkColor("#ecf0f3");
    } else {
      setNavBg("#ecf0f3");
      setLinkColor("#1f2937");
    }
    const handleShadow = () => {
      if (window.scrollY >= 90 || router.asPath !== "/") {
        setShadow(false);
      } else {
        setShadow(true);
      }
    };
    console.log(navBg);
    window.addEventListener("scroll", handleShadow);
  }, [router]);

  return (
    <div
      style={{ backgroundColor: `${navBg}` }}
      className={
        shadow
          ? "fixed w-full top-0 left-0 right-0 h-20 shadow-xl z-[100] ease-in-out duration-300"
          : "fixed w-full top-0 left-0 right-0 h-20 z-[100]"
      }
    >
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <div className="ml-4 flex flex-row">
          <Image src="/da-logo.png" alt="" width="50" height="50" />
          <h3
            style={{ color: `${linkColor}` }}
            className="font-bold md:text-2xl uppercase py-2 ml-4 my-auto"
          >
             <Link href="/">
              <a>
            <span className="text-turbo-pink-500">Inventory</span>  System
              </a>
             </Link>
           
          </h3>
        </div>

        <div>
          <ul style={{ color: `${linkColor}` }} className="hidden md:flex">
            
            {navLinks.map((link) => 
                <Link href={link.path} key={link.name}>
                <li className={session ? "ml-10 text-lg  uppercase hover:border-b-4" : "hidden"}>
                  {link.name}
                </li>
              </Link>
            )}
              <li className="ml-10">
                <Button />
              </li>
          </ul>
          <div
            style={{ color: `${linkColor}` }}
            onClick={handleNav}
            className="md:hidden"
          >
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {/* Overlay */}
      <div
        className={
          nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        {/* Side Drawer Menu */}
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
              : "fixed left-[-300%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-row flex-auto">
                <Image
                  src="/da-logo.png"
                  alt=""
                  width="40"
                  height="40"
                
                />
                <h3 className="ml-3">DA-Inventory System</h3>
              </div>

              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
              >
                <AiOutlineClose size={15} />
              </div>
            </div>
            <div className="border-b-2 border-turbo-pink-400 my-4" />
          </div>
          <div className="py-4 flex flex-col">
            <ul className="uppercase">
            {navLinks.map((link) => 
              <Link href={link.path} key={link.name}>
              <li
                onClick={() => setNav(false)}
                className={session ? "py-4 text-sm border-b-2 border-gray-300" : "hidden"}
              >
                {link.name}
              </li>
            </Link>
            )}
         
            
            </ul>
            <div className="mt-8"  onClick={() => setNav(false)}>
            <Button />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
