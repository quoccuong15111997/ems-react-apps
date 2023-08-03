import React from "react";
const MainButton = (props) => {
  return (
    <button
      onClick={props.customClick}
      className="relative inline-flex items-center justify-center ml-2 outline outline-1 rounded-sm hover:bg-primary hover:text-white"
    >
      <span
        className={`flex items-center relative px-2 py-1 transition-all ease-in duration-75 group-hover:bg-opacity-0 text-xs ${props?.className}`}
      >
        <div className="p-1">{props.icon}</div>
        {props.title}
      </span>
    </button>
  );
};

export default MainButton;
