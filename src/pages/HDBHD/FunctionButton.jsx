import React, { useState } from "react";
import { useStateContext } from "../../context/ContextProvider";

import {
  HiOutlineClipboard,
  HiOutlineDocumentDuplicate,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineArrowUturnLeft,
  HiOutlineDocumentCheck,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
  HiOutlineArrowUpOnSquare,
  HiOutlineNoSymbol,
  HiArrowUturnLeft,
  HiArrowUturnRight,
} from "react-icons/hi2";

import { ImTree, ImList2 } from "react-icons/im";

// BIT 1
export const AddButton = ({ onClick }) => {
  const { getLabelValue } = useStateContext();

  return (
    <div className="button addbutton hover:cursor-pointer">
      <div className="wrapper-button flex items-center text-white bg-[#6dc1af] hover:bg-[#0d987a] px-2 py-1 rounded ml-2 hover:-translate-y-1 transition-all duration-200 ease-linear hover:ease-linear text-xs">
        <span>
          {/* {disableBit ? <HiOutlineNoSymbol /> : <HiOutlineClipboard />} */}
          <HiOutlineClipboard />
        </span>
        <button type="button" className="ml-1" onClick={onClick}>
          {getLabelValue(14, "Thêm")}
        </button>
      </div>
    </div>
  );
};

// BIT 1
export const DuplButton = ({ onClick }) => {
  const { getLabelValue } = useStateContext();

  return (
    <div className="button addbutton hover:cursor-pointer">
      <div className="wrapper-button flex items-center text-white bg-[#6dc1af] hover:bg-[#0d987a] px-2 py-1 rounded ml-2 hover:-translate-y-1 transition-all duration-200 ease-linear hover:ease-linear text-xs">
        <span>
          {/* {disableBit ? <HiOutlineNoSymbol /> : <HiOutlineDocumentDuplicate />} */}
          <HiOutlineDocumentDuplicate />
        </span>
        <button type="button" className="ml-1" onClick={onClick}>
          {getLabelValue(110, "Nhân bản")}
        </button>
      </div>
    </div>
  );
};

// BIT 4
export const EditButton = ({ onClick, disableBit }) => {
  const { getLabelValue } = useStateContext();

  return (
    <div className="button addbutton hover:cursor-pointer">
      <div className="wrapper-button flex items-center text-white bg-[#ffa500] hover:bg-[#cc8400] px-2 py-1 rounded ml-2 hover:-translate-y-1 transition-all duration-200 ease-linear hover:ease-linear text-xs">
        <span>{disableBit ? <HiOutlineNoSymbol /> : <HiOutlinePencil />}</span>
        <button
          type="button"
          className="ml-1"
          onClick={onClick}
          disabled={disableBit}
        >
          {getLabelValue(111, "Sửa")}
        </button>
      </div>
    </div>
  );
};

// BIT 4
export const CancelButton = ({ onClick, disableBit }) => {
  const { getLabelValue } = useStateContext();

  return (
    <div className="button addbutton hover:cursor-pointer">
      <div className="wrapper-button flex items-center text-white bg-[#808080] hover:bg-[#404040] px-2 py-1 rounded ml-2 hover:-translate-y-1 transition-all duration-200 ease-linear hover:ease-linear text-xs">
        <span>
          {disableBit ? <HiOutlineNoSymbol /> : <HiOutlineArrowUturnLeft />}
        </span>
        <button
          type="button"
          className="ml-1"
          onClick={onClick}
          disabled={disableBit}
        >
          {getLabelValue(77, "Hủy")}
        </button>
      </div>
    </div>
  );
};

// BIT 2
export const DeleteButton = ({ onClick, disableBit }) => {
  const { getLabelValue } = useStateContext();

  return (
    <div className="button addbutton hover:cursor-pointer">
      <div className="wrapper-button flex items-center text-white bg-[#ff5f5f] hover:bg-[#ff2424] px-2 py-1 rounded ml-2 hover:-translate-y-1 transition-all duration-200 ease-linear hover:ease-linear text-xs">
        <span>{disableBit ? <HiOutlineNoSymbol /> : <HiOutlineTrash />}</span>
        <button
          type="button"
          className="ml-1"
          onClick={onClick}
          disabled={disableBit}
        >
          {getLabelValue(80, "Xóa")}
        </button>
      </div>
    </div>
  );
};

// BIT 4
export const SaveButton = ({ onClick, disableBit }) => {
  const { getLabelValue } = useStateContext();

  return (
    <div className="button addbutton hover:cursor-pointer">
      <div className="wrapper-button flex items-center text-white bg-[#329932] hover:bg-[#007300] px-2 py-1 rounded ml-2 hover:-translate-y-1 transition-all duration-200 ease-linear hover:ease-linear text-xs">
        <span>
          {disableBit ? <HiOutlineNoSymbol /> : <HiOutlineDocumentCheck />}
        </span>
        <button
          type="button"
          className="ml-1"
          onClick={onClick}
          disabled={disableBit}
        >
          {getLabelValue(78, "Lưu")}
        </button>
      </div>
    </div>
  );
};

// BIT 8
export const LockButton = ({ onClick, disableBit }) => {
  const { getLabelValue } = useStateContext();

  return (
    <div className="button addbutton hover:cursor-pointer">
      <div className="wrapper-button flex items-center text-white bg-[#4c4cff] hover:bg-[#3232ff] px-2 py-1 rounded ml-2 hover:-translate-y-1 transition-all duration-200 ease-linear hover:ease-linear text-xs">
        <span>
          {disableBit ? <HiOutlineNoSymbol /> : <HiOutlineLockClosed />}
        </span>
        <button
          type="button"
          className="ml-1"
          onClick={onClick}
          disabled={disableBit}
        >
          {getLabelValue(112, "Khóa")}
        </button>
      </div>
    </div>
  );
};

// BIT 16
export const UnlockButton = ({ onClick, disableBit }) => {
  const { getLabelValue } = useStateContext();

  return (
    <div className="button addbutton hover:cursor-pointer">
      <div className="wrapper-button flex items-center text-white bg-[#674ea7] hover:bg-[#5c4696] px-2 py-1 rounded ml-2 hover:-translate-y-1 transition-all duration-200 ease-linear hover:ease-linear text-xs">
        <span>
          {disableBit ? <HiOutlineNoSymbol /> : <HiOutlineLockOpen />}
        </span>
        <button
          type="button"
          className="ml-1"
          onClick={onClick}
          disabled={disableBit}
        >
          {getLabelValue(113, "Mở khóa")}
        </button>
      </div>
    </div>
  );
};

// BIT 16
export const ApproveButton = ({ onClick, disableBit }) => {
  const { getLabelValue } = useStateContext();

  return (
    <div className="button addbutton hover:cursor-pointer">
      <div className="wrapper-button flex items-center text-white bg-[#f1c232] hover:bg-[#d8ae2d] px-2 py-1 rounded ml-2 hover:-translate-y-1 transition-all duration-200 ease-linear hover:ease-linear text-xs">
        <span>
          {disableBit ? <HiOutlineNoSymbol /> : <HiOutlineArrowUpOnSquare />}
        </span>
        <button
          type="button"
          className="ml-1"
          onClick={onClick}
          disabled={disableBit}
        >
          {getLabelValue(79, "Trình ký")}
        </button>
      </div>
    </div>
  );
};

// BIT 64
export const AprvPrcs = ({ onClick }) => {
  const { getLabelValue } = useStateContext();

  return (
    <div className="button addbutton hover:cursor-pointer">
      <div className="wrapper-button flex items-center text-white bg-[#3D85C6] hover:bg-[#1e4263] px-2 py-1 rounded ml-2 hover:-translate-y-1 transition-all duration-200 ease-linear hover:ease-linear text-xs">
        <span>
          <ImTree />
        </span>
        <button type="button" className="ml-1" onClick={onClick}>
          {getLabelValue(85, "Quy trình phê duyệt")}
        </button>
      </div>
    </div>
  );
};

// BIT 64
export const AprvProd = ({ onClick }) => {
  const { getLabelValue } = useStateContext();

  return (
    <div className="button addbutton hover:cursor-pointer">
      <div className="wrapper-button flex items-center text-white bg-[#ce1983] hover:bg-[#8c0052] px-2 py-1 rounded ml-2 hover:-translate-y-1 transition-all duration-200 ease-linear hover:ease-linear text-xs">
        <span>
          <ImList2 />
        </span>
        <button type="button" className="ml-1" onClick={onClick}>
          {getLabelValue(86, "Quá trình phê duyệt")}
        </button>
      </div>
    </div>
  );
};

export const BackListButton = ({ onClick }) => {
  const { getLabelValue } = useStateContext();

  return (
    <div className="button addbutton hover:cursor-pointer">
      <div className="wrapper-button flex items-center text-white bg-[#ce1983] hover:bg-[#8c0052] px-2 py-1 rounded ml-2 hover:-translate-y-1 transition-all duration-200 ease-linear hover:ease-linear text-xs">
        <span>
          <HiArrowUturnLeft />
        </span>
        <button type="button" className="ml-1" onClick={onClick}>
          {getLabelValue(114, "Ds chứng từ")}
        </button>
      </div>
    </div>
  );
};

//test
export const EnterInvoice = ({ onClick }) => {
  const { getLabelValue } = useStateContext();

  return (
    <div className="button addbutton hover:cursor-pointer">
      <div className="wrapper-button flex items-center text-white bg-[#ce1983] hover:bg-[#8c0052] px-2 py-1 rounded ml-2 hover:-translate-y-1 transition-all duration-200 ease-linear hover:ease-linear text-xs">
        <span>
          <HiArrowUturnRight />
        </span>
        <button type="button" className="ml-1" onClick={onClick}>
          Vao chi tiet ct
        </button>
      </div>
    </div>
  );
};
