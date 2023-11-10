import React from "react";
import flogo from "../assets/evangadi-logo-footer (1).png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-700 text-white p-4 md:flex justify-between md:h-40 relative md:pe-8">
     
        <Link to={"/"}>
          <img
            className="max-w-full h-4 md:h-8 mt-6  md:mt-6 ms-16 md:ms-6"
            src={flogo}
            alt=""
          />
        </Link>

        <div className="p-4 md:p-4 text-slate-400">
          <p className=" text-lg font-medium pb-2 text-white">Useful Links</p>
          <p>How it works</p>
          <p>Terms of Service</p>
          <p>Privacy policy</p>
        </div>
        <div className="p-4 md:p-4  text-slate-400">
          <p className=" text-lg font-medium pb-2 text-white">Contact Info</p>
          <p>Evangadi Networks</p>
          <p>support@evangadi.com</p>
          <p>+1-202-386-2702</p>
        </div>
      </div>
   
  );
};

export default Footer;

