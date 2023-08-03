import React, { useState, useEffect } from "react";

import { OrderDetailHeader, OrderListCommandCell } from "../../components";

import { filterBy } from "@progress/kendo-data-query";
import {
  Grid,
  GridColumn,
  getSelectedState,
  getSelectedStateFromKeyDown,
} from "@progress/kendo-react-grid";
import { getter } from "@progress/kendo-react-common";

import { useStateContext } from "../../context/ContextProvider";

import moment from "moment";

// const RetailGrid = ({ items, sumitem }) => {
const RetailGrid = (props) => {
  const { getLabelValue } = useStateContext();

  const [order, setOrder] = useState({ maincode: "", keycode: "" });

  const DATA_ITEM_KEY = "MAINCODE";
  const SELECTED_FIELD = "selected";
  const idGetter = getter(DATA_ITEM_KEY);

  const selectionModes = [
    {
      value: "single",
      label: "Single selection mode",
    },
    {
      value: "multiple",
      label: "Multiple selection mode",
    },
  ];
  const [selectionMode, setSelectionMode] = React.useState(
    selectionModes[1].value
  );

  const initialFilter = {
    logic: "and",
    filters: [
      {
        field: "MAINCODE",
        operator: "contains",
        value: "0",
      },
    ],
  };
  const [filter, setFilter] = useState(initialFilter);

  const [selectedState, setSelectedState] = React.useState({});
  const onSelectionChange = (event) => {
    const newSelectedState = getSelectedState({
      event,
      selectedState: selectedState,
      dataItemKey: DATA_ITEM_KEY,
    });
    setSelectedState(newSelectedState);
  };

  const onKeyDown = (event) => {
    const newSelectedState = getSelectedStateFromKeyDown({
      event,
      selectedState: selectedState,
      dataItemKey: DATA_ITEM_KEY,
    });
    setSelectedState(newSelectedState);
  };

  const [itemDouble, setItemDouble] = useState({});
  const [listVisiable, setListVisiable] = useState();
  const onItemDoubleClick = (event) => {
    // var maincodeSelected = Object.keys(selectedState)[0];
    // const item = orders.find((obj) => obj.MAINCODE === maincodeSelected);
    // setOrder({ ...order, maincode: item.MAINCODE, keycode: item.KKKK0000 });
    // setListVisiable(false);

    setItemDouble(event.dataItem);
    setListVisiable(false);
  };

  props.ItemDoubleClick(itemDouble);
  props.viewList(listVisiable);

  const CellDate = (cell) => {
    return (
      <td>{moment(new Date(cell.dataItem.MAINDATE)).format("DD/MM/YYYY")}</td>
    );
  };
  const CommandCell = (props) => (
    <OrderListCommandCell
      {...props}
      lockClick={lockClick}
      editClick={editClick}
      deleteClick={deleteClick}
    />
  );

  const lockClick = (dataItem) => {
    doPostLock(dataItem.KKKK0000);
  };
  const editClick = (dataItem) => {
    setOrder({
      ...order,
      maincode: dataItem.MAINCODE,
      keycode: dataItem.KKKK0000,
    });
    setListVisiable(false);
  };
  const deleteClick = (dataItem) => {
    doDeleteOrder(dataItem.KKKK0000);
  };

  return (
    <Grid
      style={{
        height: "700px",
      }}
      onRowDoubleClick={onItemDoubleClick}
      data={filterBy(props.items, filter)}
      dataItemKey={DATA_ITEM_KEY}
      selectedField={SELECTED_FIELD}
      selectable={{
        enabled: true,
        cell: false,
        mode: selectionMode,
      }}
      navigatable={true}
      onSelectionChange={onSelectionChange}
      onKeyDown={onKeyDown}
      filterable={true}
      filter={filter}
      onFilterChange={(e) => setFilter(e.filter)}
    >
      <GridColumn
        headerCell={OrderDetailHeader}
        field="MAINCODE"
        title={getLabelValue(19, "Mã đơn hàng")}
        width="150px"
      />
      <GridColumn
        headerCell={OrderDetailHeader}
        field="MAINDATE"
        title={getLabelValue(20, "Ngày tạo đơn")}
        width="200px"
        filter="date"
        cell={CellDate}
      />
      <GridColumn
        headerCell={OrderDetailHeader}
        field="NOTETEXT"
        title={getLabelValue(21, "Nội dung")}
      />
      <GridColumn
        headerCell={OrderDetailHeader}
        field="STTENAME"
        title={getLabelValue(22, "Trạng thái")}
        width="200px"
      />
      <GridColumn
        headerCell={OrderDetailHeader}
        cell={CommandCell}
        width="200px"
        filterable={false}
        title={getLabelValue(23, "Tác vụ")}
      />
    </Grid>
  );
};

export default RetailGrid;
