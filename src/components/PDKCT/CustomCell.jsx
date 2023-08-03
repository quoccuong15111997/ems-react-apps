import moment from "moment";

export const CellDate = (cell) => {
  return (
    <td>{moment(new Date(cell.dataItem[cell.field])).format("DD/MM/YYYY")}</td>
  );
};
export const CellBussinessType = (cell) => {
  return <td>{cell.dataItem[cell.field].ITEMNAME}</td>;
};
export const CellBussinessPlace = (cell) => {
  return (
    <td>
      {cell.dataItem.WORKTYPE.ITEMNAME +
        " - " +
        cell.dataItem.WORKPLAC.ITEMNAME}
    </td>
  );
};
