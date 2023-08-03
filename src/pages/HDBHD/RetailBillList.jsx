import React from "react";
import { useState, useEffect, useRef } from "react";
import api from "../../api";
import { apiUrl } from "../../constants";
import { useStateContext } from "../../context/ContextProvider";

import {
  AddButton,
  DuplButton,
  EditButton,
  CancelButton,
  DeleteButton,
  SaveButton,
  LockButton,
  UnlockButton,
  ApproveButton,
  AprvPrcs,
  AprvProd,
  BackListButton,
  EnterInvoice,
} from "./FunctionButton";
import FilterHeader from "./FilterHeader";
import RetailGrid from "./RetailGrid";
import RetailEdit from "./RetailEdit";

const item = [
  {
    id: 1,
    name: "LocLe",
  },
  {
    id: 2,
    name: "PhucFuck",
  },
];

function ChckBit(a, b) {
  return (a & b) > 0 ? true : false;
}

const RetailBillList = () => {
  const AcceRght = 65279;
  const [listVisiable, setListVisiable] = useState(false);
  // trang thai enable/disable Button Function
  const [disableButton, setdisableButton] = useState({
    dupl: false,
    edit: false,
    cancel: false,
    save: false,
    delete: false,
    lock: false,
    unlock: false,
    aprove: false,
    aprvprcs: false,
    aprvprod: false,
  });
  // nut an hien Button Function
  const [visiableButton, setVisiableButton] = useState({
    edit: false,
    cancel: false,
    save: false,
    delete: false,
    lock: false,
    unlock: false,
    aprove: false,
  });

  // BEGIN TEST
  const [visiable, setVisiable] = useState(false);
  const enterInvoiceHandler = () => {
    setListVisiable(true);
    setVisiableButton({
      ...visiableButton,
      edit: false,
      cancel: false,
      save: false,
      delete: false,
      lock: false,
      unlock: false,
      aprove: false,
    });
  };
  const outInvoiceHandler = () => {
    setListVisiable(false);
    setVisiableButton({
      ...visiableButton,
      edit: false,
      cancel: false,
      save: false,
      delete: false,
      lock: false,
      unlock: false,
      aprove: false,
    });
  };
  // END CODE TEST

  // Ma so quyen theo User

  const AddNewHandler = (item) => {
    console.log(item);

    setVisiableButton({
      ...visiableButton,
      edit: true,
      cancel: true,
      save: true,
      delete: true,
      lock: true,
      unlock: true,
      aprove: true,
    });
    setListVisiable(true);
    setItemProcess({
      DCMNCODE: "DDHKH",
      KKKK0000: "",
      MAINCODE: "",
      MAINDATE: new Date(),
      NOTETEXT: "",
      STTENAME: "",
      STTESIGN: 0,
    });
  };
  const DuplHandler = (item) => {
    console.log(item);
  };
  const EditHandler = (item) => {
    console.log(item);
  };
  const CancelHandler = (item) => {
    console.log(item);
  };
  const SaveHandler = (item) => {
    console.log(item);
  };
  const DeleteHandler = (item) => {
    console.log(item);
  };
  const LockHandler = (item) => {
    setdisableButton({
      ...disableButton,
      cancel: true,
      save: true,
      delete: true,
      lock: true,
      unlock: false,
      aprove: true,
      aprvprcs: true,
      aprvprod: true,
      edit: true,
    });
  };
  const UnlockHandler = (item) => {
    setdisableButton({
      ...disableButton,
      // add: true,
      cancel: false,
      save: false,
      delete: false,
      lock: false,
      unlock: false,
      aprove: false,
      // aprvprcs: true,
      // aprvprod: true,
      edit: false,
    });
  };
  const ApproveHandler = (item) => {
    setdisableButton({
      ...disableButton,
      // add: true,
      cancel: true,
      save: true,
      delete: true,
      lock: true,
      unlock: false,
      aprove: true,
      aprvprcs: true,
      aprvprod: true,
      edit: true,
    });
  };
  const ApprovePrcsHandler = (item) => {
    console.log(item);
  };
  const ApproveProdHandler = (item) => {
    console.log(item);
  };

  const [orders, setOrders] = useState([]);
  const getListMasterHandler = (data) => {
    setOrders(data);
  };

  const [itemProcess, setItemProcess] = useState([]);
  const getItemDoubleHandler = (data) => {
    setItemProcess(data);
  };
  const getViewList = (data) => {
    if (data !== undefined) {
      setListVisiable(data);
    }
  };

  return (
    <>
      <div className={"px-3 py-5 flex justify-between items-center"}>
        {!listVisiable && (
          <div>
            <EnterInvoice
              onClick={() => {
                enterInvoiceHandler();
              }}
            />
          </div>
        )}
        {listVisiable && (
          <div>
            <BackListButton
              onClick={() => {
                outInvoiceHandler();
              }}
            />
          </div>
        )}
        <div>
          <h4 className="uppercase font-semibold">Biên nhận bán hàng</h4>
        </div>

        <div id="view-button" className="flex flex-row">
          {ChckBit(AcceRght, 1) && (
            <AddButton
              onClick={() => AddNewHandler(item)}
              disableBit={disableButton.add}
            />
          )}
          {ChckBit(AcceRght, 1) && (
            <DuplButton
              onClick={() => DuplHandler(item)}
              disableBit={disableButton.add}
            />
          )}
          {visiableButton.edit && ChckBit(AcceRght, 4) && (
            <EditButton
              onClick={() => EditHandler(item)}
              disableBit={disableButton.edit}
            />
          )}
          {visiableButton.save && ChckBit(AcceRght, 4) && (
            <SaveButton
              onClick={() => SaveHandler(item)}
              disableBit={disableButton.save}
            />
          )}
          {visiableButton.cancel && ChckBit(AcceRght, 4) && (
            <CancelButton
              onClick={() => CancelHandler(item)}
              disableBit={disableButton.cancel}
            />
          )}
          {visiableButton.delete && ChckBit(AcceRght, 2) && (
            <DeleteButton
              onClick={() => DeleteHandler(item)}
              disableBit={disableButton.delete}
            />
          )}
          {visiableButton.lock && ChckBit(AcceRght, 8) && (
            <LockButton
              onClick={() => LockHandler(item)}
              disableBit={disableButton.lock}
            />
          )}
          {visiableButton.unlock && ChckBit(AcceRght, 16) && (
            <UnlockButton
              onClick={() => UnlockHandler(item)}
              disableBit={disableButton.unlock}
            />
          )}
          {visiableButton.aprove && ChckBit(AcceRght, 8) && (
            <ApproveButton
              onClick={() => ApproveHandler(item)}
              disableBit={disableButton.aprove}
            />
          )}
          {ChckBit(AcceRght, 64) && (
            <AprvPrcs onClick={() => ApprovePrcsHandler(item)} />
          )}
          {ChckBit(AcceRght, 64) && (
            <AprvProd onClick={() => ApproveProdHandler(item)} />
          )}
        </div>
      </div>

      {listVisiable ? (
        <>
          <FilterHeader ListMaster={getListMasterHandler} />
          <RetailGrid
            items={orders}
            ItemDoubleClick={getItemDoubleHandler}
            viewList={getViewList}
          />
        </>
      ) : (
        <div>
          <RetailEdit item={itemProcess} />
        </div>
      )}
    </>
  );
};

export default RetailBillList;
