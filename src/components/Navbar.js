import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { useRouter } from "next/router";
import Button from "./Button";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [navBg, setNavBg] = useState("transparent");
  const [linkColor, setLinkColor] = useState("#1f2937");
  const [shadow, setShadow] = useState(true);
  const handleNav = () => {
    setNav(!nav);
  };

  const [position, setPosition] = useState("fixed");
  const router = useRouter();

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
        setShadow(true);
      } else {
        setShadow(false);
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
          <Image src="/../public/da-logo.png" alt="" width="50" height="50" />
          <h3
            style={{ color: `${linkColor}` }}
            className="font-bold uppercase py-2 ml-4 "
          >
            DA- Inventory System
          </h3>
        </div>

        <div>
          <ul style={{ color: `${linkColor}` }} className="hidden md:flex">
            <Link href="/">
              <li className="ml-10 text-sm uppercase hover:border-b-4  ">
                Home
              </li>
            </Link>
            <Link href="/about">
              <li className="ml-10 text-sm uppercase hover:border-b-4 ">
                About
              </li>
            </Link>
            <Link href="/sample">
              <li className="ml-10 text-sm uppercase hover:border-b-4">
                Sample
              </li>
            </Link>
            <Link href="/property">
              <li className="ml-10 text-sm uppercase hover:border-b-4 ">
                Property
              </li>
            </Link>
            {/*  <Link href="/signin">
              <li className="ml-10 text-sm uppercase">
                <button className="px-8 py-2 border">Sign-in</button>
              </li>
            </Link> */}
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
                  src="/../public/da-logo.png"
                  alt=""
                  width="40"
                  height="40"
                />
                <h3 className="px-3">DA-Inventory System</h3>
              </div>

              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
              >
                <AiOutlineClose size={25} />
              </div>
            </div>
            <div className="border-b border-gray-500 my-4" />
          </div>
          <div className="py-4 flex flex-col">
            <ul className="uppercase">
              <Link href="/">
                <li
                  onClick={() => setNav(false)}
                  className="py-4 text-sm border-b-2 border-gray-300"
                >
                  Home
                </li>
              </Link>
              <Link href="/about">
                <li
                  onClick={() => setNav(false)}
                  className="py-4 text-sm border-b-2 border-gray-300"
                >
                  About
                </li>
              </Link>
              <Link href="/property">
                <li onClick={() => setNav(false)} className="py-4 text-sm">
                  Property
                </li>
              </Link>
              <Link href="/twitch">
                <li onClick={() => setNav(false)} className="py-4 text-sm">
                  Twitch
                </li>
              </Link>
              <Link href="/">
                <li onClick={() => setNav(false)} className="py-4 text-sm">
                  Projects
                </li>
              </Link>
            </ul>
            <div className="pt-40 ">
              <p className="uppercase tracking-widest text-[#5651e5]">
                Let's connect
              </p>
              <div className="flex items-center justify-between my-4 w-full sm:w-[80%]">
                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                  <FaLinkedinIn />
                </div>
                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                  <FaGithub />
                </div>
                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                  <AiOutlineMail />
                </div>
                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                  <BsFillPersonLinesFill />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
