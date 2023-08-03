import React,{useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import {
  Form,
  Field,
  FormElement,
  FieldWrapper,
} from "@progress/kendo-react-form";
import {
  TextBox,
  NumericTextBox,
  TextArea,
  Checkbox,
} from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Error, Label } from "@progress/kendo-react-labels";
import { Button } from "@progress/kendo-react-buttons";
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";
const EditForm = (props) => {
  const lstLocationType = useSelector((state) => state.common.lstLocationType);
  const lstProvince = useSelector((state) => state.common.lstProvince);
  const lstNation = useSelector((state) => state.common.lstNation);
  const lstTimekeepingTypeCT = useSelector(
    (state) => state.common.lstTimekeepingTypeCT
  );
  const [workPlaces, setWorkPlaces] = useState([]);
  
  const { cancelEdit, onSubmit, item, ...other } = props;
  const taxRateValueValidator = (value) =>
    value < 0 ? "Giá trị không hợp lệ" : "";
  const emtyValueValidator = (value) =>
    value === "" ? "Vui lòng nhập nội dung đề nghị chi" : "";
  const emtyDateValueValidator = (value) =>
   {
    console.log(value);
   }
  const undefinedValueValidator = (value) =>
    value === undefined || value === "" ? "Vui lòng chọn" : "";
  const minValueValidator = (value) =>
    value > 0 ? "" : "Số tiền phải lớn hơn 0";
  const DcmnView = props.DcmnView;
  const NonNegativeNumericInput = (fieldRenderProps) => {
    const { validationMessage, visited, id, valid, label, ...others } =
      fieldRenderProps;
    return (
      <div className="m-1 w-72">
        <Label editorId={id} editorValid={valid} className={"k-form-label"}>
          {label}
        </Label>
        <div className={"k-form-field-wrap"}>
          <NumericTextBox {...others} />
          {visited && validationMessage && <Error>{validationMessage}</Error>}
        </div>
      </div>
    );
  };
  const MultipleLineInput = (fieldRenderProps) => {
    const { validationMessage, visited, id, valid, label, ...others } =
      fieldRenderProps;
    return (
      <div className="m-1 w-72">
        <Label editorId={id} editorValid={valid} className={"k-form-label"}>
          {label}
        </Label>
        <div className={"k-form-field-wrap"}>
          <TextArea {...others} />
          {visited && validationMessage && <Error>{validationMessage}</Error>}
        </div>
      </div>
    );
  };
  const TextBoxField = (fieldRenderProps) => {
    const { validationMessage, visited, label, id, valid, ...others } =
      fieldRenderProps;
    return (
      <div className="m-1 w-72">
        <Label editorId={id} className={"k-form-label"}>
          {label}
        </Label>
        <div className={"k-form-field-wrap"}>
          <TextBox {...others} />
        </div>
      </div>
    );
  };
  const ComboboxField = (fieldRenderProps) => {
    const { validationMessage, visited, label, id, valid, ...others } =
      fieldRenderProps;
    return (
      <div className="m-1 w-72">
        <Label editorId={id} className={"k-form-label"}>
          {label}
        </Label>
        <div className={"k-form-field-wrap"}>
          <DropDownList {...others} />
          {visited && validationMessage && <Error>{validationMessage}</Error>}
        </div>
      </div>
    );
  };
  const CheckBoxComboboxField = (fieldRenderProps) => {
    const { validationMessage, visited, label, id, valid, ...others } =
      fieldRenderProps;
    return (
      <div className="m-1 w-72">
        <Checkbox
          className={"k-form-label"}
          editorId={id}
          label={label}
        />
        <div className={"k-form-field-wrap"}>
          <DropDownList {...others} disabled />
          {visited && validationMessage && <Error>{validationMessage}</Error>}
        </div>
      </div>
    );
  };
  const DateField = (fieldRenderProps) => {
    const { validationMessage, visited, label, id, valid, ...others } =
      fieldRenderProps;
    return (
      <div className="m-1 w-72">
        <Label editorId={id} className={"k-form-label"}>
          {label}
        </Label>
        <div className={"k-form-field-wrap"}>
          <DatePicker {...others} />
          {visited && validationMessage && <Error>{validationMessage}</Error>}
        </div>
      </div>
    );
  };
  const dispatch = useDispatch();
  return (
    <Form
      initialValues={item}
      onSubmit={onSubmit}
      render={(renderProps) => (
        <Dialog title={"Đăng ký công tác"} onClose={cancelEdit}>
          <FormElement>
            <div className="flex justify-start items-center">
              <FieldWrapper>
                <Field
                  name={"WORKTYPE"}
                  component={ComboboxField}
                  label={"Loại công tác"}
                  data={lstLocationType}
                  textField={"ITEMNAME"}
                  dataItemKey={"ITEMCODE"}
                  validator={undefinedValueValidator}
                  onChange={(e) => {
                    if (e.value.ITEMCODE == "01") {
                      setWorkPlaces(lstProvince);
                    }
                    if (e.value.ITEMCODE == "02") {
                      setWorkPlaces(lstNation);
                    }
                  }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <Field
                  name={"WORKPLAC"}
                  component={ComboboxField}
                  label={"Nơi công tác"}
                  data={workPlaces}
                  textField={"ITEMNAME"}
                  dataItemKey={"ITEMCODE"}
                  validator={undefinedValueValidator}
                />
              </FieldWrapper>
            </div>
            <div className=" flex justify-start items-center">
              <FieldWrapper>
                <Field
                  name={"FRLVDATE"}
                  component={DateField}
                  label={"Từ ngày"}
                  format="dd/MM/yyyy"
                  weekNumber={true}
                  validator={undefinedValueValidator}
                />
              </FieldWrapper>
              <FieldWrapper>
                <Field
                  name={"TOLVDATE"}
                  component={DateField}
                  label={"Đến ngày"}
                  format="dd/MM/yyyy"
                  weekNumber={true}
                  validator={undefinedValueValidator}
                />
              </FieldWrapper>
            </div>
            <div className="flex justify-start items-center">
              <FieldWrapper>
                <Field
                  name={"TIMEMORN"}
                  component={ComboboxField}
                  label={"Loại chấm công sáng"}
                  data={lstTimekeepingTypeCT}
                  textField={"ITEMNAME"}
                  dataItemKey={"ITEMCODE"}
                  validator={undefinedValueValidator}
                />
              </FieldWrapper>
              <FieldWrapper>
                <Field
                  name={"TIMEAFTR"}
                  component={ComboboxField}
                  label={"Loại chấm công chiều"}
                  data={lstTimekeepingTypeCT}
                  textField={"ITEMNAME"}
                  dataItemKey={"ITEMCODE"}
                  validator={undefinedValueValidator}
                />
              </FieldWrapper>
              <FieldWrapper>
                <Field
                  name={"TIMEEVEN"}
                  component={ComboboxField}
                  label={"Loại chấm công tối"}
                  data={lstTimekeepingTypeCT}
                  textField={"ITEMNAME"}
                  dataItemKey={"ITEMCODE"}
                  validator={undefinedValueValidator}
                />
              </FieldWrapper>
            </div>
          </FormElement>
          <div className="flex items-center justify-end">
            <Button
              className="m-1"
              type={"submit"}
              themeColor={"primary"}
              disabled={!renderProps.allowSubmit}
              onClick={renderProps.onSubmit}
              icon="save"
              svgIcon={saveIcon}
            >
              LƯU
            </Button>
            <Button
              className="m-1"
              onClick={cancelEdit}
              icon="cancel"
              svgIcon={cancelIcon}
            >
              HỦY
            </Button>
          </div>
        </Dialog>
      )}
      {...other}
    />
  );
};

export default EditForm;
