import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const SubMenu = ({ data }) => {
  // console.log(data);

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  function handleSubMenuToggle() {
    setIsSubMenuOpen(!isSubMenuOpen);
  }

  return (
    <li key={data.PRCSCODE}>
      <button
        // className='flex items-center justify-between w-full px-4 py-2 font-medium text-left text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
        className="flex items-center justify-start w-full py-1 text-left text-xs text-white-700 hover:text-[#ff9f3e] hover:font-semibold hover:pl-2 transition-pl-2 duration-200 ease-linear font-medium"
        onClick={handleSubMenuToggle}
      >
        {data.PRCSPARA.REF_LINK !== null && data.PRCSPARA.REF_LINK ? (
          <>
            {data.SUB_MENU ? (
              isSubMenuOpen ? (
                <span className="mr-1 border-1 rounded-sm border-[#8d8d8d]">
                  <AiOutlineMinus className="w-2 h-2" />
                </span>
              ) : (
                <span className="mr-1 border-1 rounded-sm border-[#8d8d8d]">
                  <AiOutlinePlus className="w-2 h-2" />
                </span>
              )
            ) : (
              ""
            )}
            <NavLink
              end
              to={data.PRCSPARA.REF_LINK}
              className={({ isActive }) =>
                "block transition duration-150 truncate " +
                (isActive
                  ? "text-white py-1 px-2 bg-orange-500 rounded"
                  : "text-black hover:text-slate-400")
              }
            >
              {data.PRCSNAME}
            </NavLink>
          </>
        ) : (
          <>
            {data.SUB_MENU ? (
              isSubMenuOpen ? (
                <span className="mr-1 border-1 rounded-sm border-[#8d8d8d]">
                  <AiOutlineMinus className="w-2 h-2" />
                </span>
              ) : (
                <span className="mr-1 border-1 rounded-sm border-[#8d8d8d]">
                  <AiOutlinePlus className="w-2 h-2" />
                </span>
              )
            ) : (
              ""
            )}
            <span>{data.PRCSNAME}</span>
          </>
        )}

        {/* {data.SUB_MENU && (
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
        )} */}
      </button>
      {isSubMenuOpen && data.SUB_MENU && (
        // <ul className='mt-2 space-y-2'>
        <ul className="ml-4">
          {data.SUB_MENU.map((item) => (
            <SubMenu key={item.title} data={{ ...item }} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SubMenu;
