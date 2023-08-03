import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Transition from "../../utils/Transition";

import UserAvatar from "../../images/user-avatar-32.png";
import { useStateContext } from "../../context/ContextProvider";
function UserMenu() {
  const { userData } = useStateContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative inline-flex user-info">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img
          className="w-8 h-8 rounded-full"
          src={"https://i.pravatar.cc/300"}
          width="32"
          height="32"
          alt="User"
        />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm text-white font-medium group-hover:text-slate-800">
            {userData.EMPLNAME}
          </span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
            <div className="font-medium text-slate-800">
              {userData.EMPLNAME}
            </div>
            <div className="text-xs text-slate-500 italic">
              {userData.JOB_NAME}
            </div>
          </div>
          <ul>
            <li>
              <NavLink
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Cài đặt
              </NavLink>
            </li>
            <li>
              <NavLink
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/logout"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Đăng xuất
              </NavLink>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default UserMenu;
