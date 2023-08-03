import React from "react";

const EditCommandCell = (props) => {
  return (
    <div className="flex justify-center items-center">
      <td>
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={() => props.enterEdit(props.dataItem)}
        >
          Sửa
        </button>
      </td>
      <div>
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary "
          onClick={() => props.enterRemove(props.dataItem)}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default EditCommandCell;
