import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SideMenu = ({ data }) => {
  console.log(data);

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  function handleSubMenuToggle() {
    setIsSubMenuOpen(!isSubMenuOpen);
  }

  return (
    <li key={data.PRCSCODE} className="ml-4">
      <button
        // className='flex items-center justify-between w-full px-4 py-2 font-medium text-left text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
        className="flex items-center justify-between w-full px-4 py-2 font-medium text-left text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        onClick={handleSubMenuToggle}
      >
        {data.PRCSPARA.REF_LINK !== null && data.PRCSPARA.REF_LINK ? (
          <NavLink end to={data.PRCSPARA.REF_LINK}>
            {data.PRCSNAME}
          </NavLink>
        ) : (
          <span>{data.PRCSNAME}</span>
        )}

        {data.SUB_MENU && (
          <svg
            className={`w-5 h-5 ${isSubMenuOpen ? "-rotate-180" : "rotate-0"}`} // Code chuyen dau ^ quay 180
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      {isSubMenuOpen && data.SUB_MENU && (
        // <ul className='mt-2 space-y-2'>
        <ul>
          {data.SUB_MENU.map((item) => (
            <SideMenu key={item.title} data={{ ...item }} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SideMenu;
