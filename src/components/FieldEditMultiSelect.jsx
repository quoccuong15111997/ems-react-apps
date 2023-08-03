import React from "react";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { useStateContext } from "../context/ContextProvider";
import { filterBy } from "@progress/kendo-data-query";
const FieldEditMultiSelect = (fieldRenderProps) => {
  const { appColors } = useStateContext();
  const {
    title,
    id,
    disabled,
    value,
    data,
    textField,
    dataItemKey,
    onComboboxChange,
    defaultValue,
    ...others
  } = fieldRenderProps;
   const [dataFilter, setDataFilter] = React.useState(data.slice());
   const filterChange = (event) => {
     setDataFilter(filterBy(data.slice(), event.filter));
   };
  return (
    <FieldWrapper>
      {title && <Label className="text-sm text-gray-500">{title}</Label>}
      <div className={"k-form-field-wrap"}>
        <MultiSelect
          filterable={true}
          onFilterChange={filterChange}
          className={appColors.inputColor}
          disabled={disabled}
          name={id}
          id={id}
          style={{ borderColor: "grey" }}
          data={dataFilter}
          value={value}
          textField={textField}
          dataItemKey={dataItemKey}
          defaultValue={defaultValue}
          autoClose={false}
          onChange={(e) => {
            onComboboxChange(e, id);
          }}
        />
      </div>
    </FieldWrapper>
  );
};

export default FieldEditMultiSelect;
