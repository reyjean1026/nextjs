import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-center  p-5 bg-gray-100 h-full">
        <p className=" text-gray-800 font-semibold">
          © 2022 | All rights reserved | Build with ❤ by{" "}
          <span className="hover:text-red-600 font-semibold cursor-pointer">
            DA13 ICTU{" "}
          </span>
        </p>
      </div>
    </>
  );
}

export default Footer;
