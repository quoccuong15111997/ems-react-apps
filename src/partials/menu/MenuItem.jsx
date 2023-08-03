import React,{useState} from 'react'
import { NavLink } from "react-router-dom";
const MenuItem = (props) => {
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  return (
    <li className="mb-1 last:mb-0 rounded-lg hover:bg-primary pl-2 pt-1 pb-1">
      {props.item.PRCSPARA.REF_LINK !== null && props.item.PRCSPARA.REF_LINK ? (
        <NavLink
          end
          to={props.item.PRCSPARA.REF_LINK}
          style={({ isActive }) => ({
            backgroundColor: isActive ? currentColor : "",
          })}
          className={({ isActive }) =>
            "block transition duration-150 truncate " +
            (isActive
              ? "text-indigo-500"
              : "text-gray-800 hover:text-slate-200")
          }
        >
          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
            {props.item.PRCSNAME}
          </span>
        </NavLink>
      ) : (
        <div className="block transition duration-150 truncate text-gray-800 hover:text-slate-200 cursor-pointer">
          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
            {props.item.PRCSNAME}
          </span>
        </div>
      )}
    </li>
  );
}

export default MenuItem