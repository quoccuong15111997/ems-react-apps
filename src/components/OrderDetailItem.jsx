import React, { useState, useRef } from "react";
import MainButton from "./MainButton";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
const OrderDetailItem = (props) => {
  let dataItem = props.dataItem;
  return (
    <div
      className="k-listview-item w-full"
      style={{
        padding: 10,
        borderBottom: "1px solid lightgrey",
      }}
    >
      <div className="cursor-pointer" onClick={() => {}}>
        <div className="font-bold text-primary">
          {"["}
          {dataItem.PRDCCODE}
          {"]"}
          {dataItem.PRDCNAME}
        </div>
        <div className="flex">
          <span className="mr-1 text-gray-500">Số lượng:</span>
          <span className="text-red-600">{dataItem.PRDCQTTY}</span>
          <span className="ml-1">{dataItem.QUOMNAME}</span>
          <div className="flex">
            <span className="mr-1 ml-3 text-gray-500">Giá bán: </span>
            <span className="text-red-600">
              {new Intl.NumberFormat().format(dataItem.SALEPRCE)}
            </span>
          </div>
        </div>
        <div className="flex">
          <span className="mr-1 text-gray-500">Chiết khấu:</span>
          <span className="text-red-600">{dataItem.DISCRATE}</span>
          <span className="mr-1 ml-3 text-gray-500">Tiền Chiết khấu:</span>
          <span className="text-red-600">
            {new Intl.NumberFormat().format(dataItem.DCPRAMNT)}
          </span>
        </div>
        <div className="flex">
          <span className="mr-1 text-gray-500">Thành tiền:</span>
          <span className="text-red-600">
            {new Intl.NumberFormat().format(dataItem.MNEYAMNT)}
          </span>
        </div>
        {dataItem.inEdit && (
          <div className="flex justify-end">
            <MainButton
              title="Sửa"
              icon={<MdModeEditOutline />}
              customClick={() => props.onEditClick(dataItem)}
            />
            <MainButton
              title="Xóa"
              icon={<MdDelete />}
              customClick={() => props.onDeleteClick(dataItem)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailItem;
