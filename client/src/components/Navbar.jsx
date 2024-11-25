import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const Navbar = () => {

  const navigate = useNavigate();

  const {user,  setShowLogin, logout, credit} = useContext(AppContext)

  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-28 sm:w-32 lg:w-40" />
      </Link>
      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => navigate("/buy")} className="flex items-center gap-2 bg-blue-100 
            px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all">
              <img src={assets.credit_star} alt="credit" className="w-5" />
              <p className="text-xs sm:text-sm">Credits Left : {credit}</p>
            </button>
            <p className="text-gray-600 max-sm:hidden pl-4">Hi,{user.name} </p>
            <div className="relative group">
              <img
                src={assets.profile_icon}
                className="w-10 h-10 drop-shadow"
                alt="user"
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12 transition-all">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li onClick={logout} className="py-1 px-2 cursor-pointer pr-10">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p onClick={() => navigate("/buy")} className="cursor-pointer">
              Pricing
            </p>
            <button onClick={()=> setShowLogin(true)}
             className="bg-zinc-800 px-7 py-2 
             sm:px-10 text-white text-sm rounded-full">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
