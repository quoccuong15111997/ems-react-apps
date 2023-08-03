import React from 'react'
import { FcFactory, FcOk } from "react-icons/fc";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
const BranchItem = (props) => {
 
  return (
    <div
      className="w-full cursor-pointer rounded-sm"
      onClick={() => props.onClick(props.code)}
    >
      <span
        className={`flex m-2 p-1 items-center hover:bg-blue-600 hover:text-white rounded-sm ${
          props.selected ? "bg-blue-600 text-white" : ""
        }`}
      >
        <FcFactory className="w-4 h-4 m-2" />
        <a className="w-full">{props.title}</a>
      </span>
    </div>
  );
}

export default BranchItem