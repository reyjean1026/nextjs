import React from "react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

function Footer() {
  return (
    <>
      <div className="flex flex-row text-center  p-5 bg-gray-100 h-auto w-full justify-center">
        <div>
        <p className=" text-gray-800 font-semibold ">
          © 2022 | All rights reserved | Build with ❤ by{" "}
          <span className="hover:text-red-600 font-semibold cursor-pointer">
            DA13 ICTU{" "}
          </span>
        </p>
        </div>
        <div className="cursor-pointer">
        <Link href="https://github.com/reyjean1026/nextjs.git" passHref>
                 <a><FaGithub size={25}/></a>   
          </Link>
        </div>
   
      </div>
      
  
    </>
  );
}

export default Footer;
