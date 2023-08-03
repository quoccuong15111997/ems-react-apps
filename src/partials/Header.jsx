import React, { useState, useEffect } from "react";
import SearchModal from "./header/SearchModal";
import Branch from "./header/Branch";
import Language from "./header/Language";
import Language2 from "./header/Language2";
import UserMenu from "./header/UserMenu";
import { NavLink } from "react-router-dom";
import LogoEMS from "../images/logo_ems.png";
import { useStateContext } from "../context/ContextProvider";

function Header({ sidebarOpen, setSidebarOpen }) {
  const { setScreenSize, screenSize, userData } = useStateContext();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <header className="sticky top-0 bg-[#0d987a] z-30 px-4 lg:px-6 sm:px-6 lg:pl-[10px]">
      <div className="">
        <div className="flex items-center justify-between h-12 -mb-px">
          {/* Header: Left side */}
          <div className="flex items-center">
            {/* Hamburger button */}
            <button
              className={`text-white hover:text-[#eb7a06] ${
                userData == null ? "hidden" : ""
              }`}
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current rounded border border-white box-content p-1 hover:border-[#eb7a06]"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
            <NavLink end to="/" className="block">
              <img
                src={LogoEMS}
                className="w-[90px] p-1 ml-3 h-auto bg-white rounded-sm"
              />
            </NavLink>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center">
            <Branch />
            <Language2 />
            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 mx-3" />
            {userData && <UserMenu />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
