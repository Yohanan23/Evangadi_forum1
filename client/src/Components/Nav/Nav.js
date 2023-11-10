import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = ({logout}) => {
  return (
    <nav className=" flex items-center justify-between p-8 bg-gray-200">
  <div>
    <Link to="/">
      <img className="h-4 md:h-6 md:ms-20"
        src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
        alt="logo"
      />
    </Link>
  </div>
  <div className="header__navRight space-x-4 hover:to-orange-400 ">
    <Link to="/" className="hidden md:inline-flex">
      Home
    </Link>
    <span className=" hidden md:inline-flex">How it Works</span>
    <span className=" md-pe-16">
      <button
        onClick={logout}
        className=" bg-blue-700 text-white  py-1 px-10 rounded text-xs me-8"
      >
        {localStorage.getItem("auth-token") ? "LogOut" : "SIGN IN"}
      </button>
    </span>
  </div>
</nav>

  );
};

export default Nav;
