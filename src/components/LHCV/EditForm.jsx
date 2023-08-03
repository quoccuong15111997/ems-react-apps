import React from "react";
import { useSelector } from "react-redux";
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
} from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Error, Label } from "@progress/kendo-react-labels";
import { Button } from "@progress/kendo-react-buttons";
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";
const EditForm = (props) => {
  const lstLoadAcctDcmn = useSelector((state) => state.common.lstLoadAcctDcmn);
  const lstLoadBusnSpend = useSelector(
    (state) => state.common.lstLoadBusnSpend
  );
  const lstSpndSgDtTaxRaNm = useSelector(
    (state) => state.common.lstSpndSgDtTaxRaNm
  );
  const lstYesOrNo = useSelector((state) => state.common.lstYesOrNo);
  const { cancelEdit, onSubmit, item, ...other } = props;
  const taxRateValueValidator = (value) =>
    value < 0 ? "Giá trị không hợp lệ" : "";
  const emtyValueValidator = (value) =>
    value === "" ? "Vui lòng nhập nội dung đề nghị chi" : "";
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
        </div>
      </div>
    );
  };
  return (
    <Form
      initialValues={item}
      onSubmit={onSubmit}
      render={(renderProps) => (
        <Dialog title={"Phiếu đề nghị thanh toán"} onClose={cancelEdit}>
          <FormElement>
            <FieldWrapper>
              <Field
                name={"MEXLNNTE_D"}
                component={MultipleLineInput}
                label={"Nội dung đề nghị chi"}
                validator={emtyValueValidator}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Field
                name={"MNEYCRAM"}
                component={NonNegativeNumericInput}
                label={"Số tiền"}
                validator={minValueValidator}
              />
            </FieldWrapper>
            <div className=" flex justify-start items-center">
              <FieldWrapper>
                <Field
                  name={"RFRNCODE"}
                  component={TextBoxField}
                  label={"Số CT/Hóa đơn(nếu có)"}
                />
              </FieldWrapper>
              <FieldWrapper>
                <Field
                  name={"RFRNDATE"}
                  component={DateField}
                  label={"Ngày hóa đơn liên quan(nếu có)"}
                  format="dd/MM/yyyy"
                  weekNumber={true}
                />
              </FieldWrapper>
            </div>

            {/* Nhóm tùy chọn detail 2 - Mã nhóm: 32 */}
            {DcmnView.find((x) => x.DATACODE === "32").DATAVIEW > 0 && (
              <div className="flex justify-start items-center">
                <FieldWrapper>
                  <Field
                    name={"RFRNDCMN"}
                    component={ComboboxField}
                    label={"Nghiệp vụ liên quan"}
                    data={lstLoadAcctDcmn}
                    textField={"ITEMNAME"}
                    dataItemKey={"ITEMCODE"}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <Field
                    name={"SPNDCODE"}
                    label={"Mã chi phí"}
                    component={ComboboxField}
                    data={lstLoadBusnSpend}
                    textField={"ITEMNAME"}
                    dataItemKey={"ITEMCODE"}
                  />
                </FieldWrapper>
              </div>
            )}

            {/* Nhóm tùy chọn detail 3 - Mã nhóm: 33 */}
            {DcmnView.find((x) => x.DATACODE === "33").DATAVIEW > 0 && (
              <div className="flex justify-start items-center">
                <FieldWrapper>
                  <Field
                    name={"INVCTEMP"}
                    component={TextBoxField}
                    label={"Mẫu số hóa đơn"}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <Field
                    name={"INVCSIGN"}
                    component={TextBoxField}
                    label={"Ký hiệu hóa đơn"}
                  />
                </FieldWrapper>
              </div>
            )}

            {/* Nhóm tùy chọn detail 4 - Mã nhóm: 34 */}
            {DcmnView.find((x) => x.DATACODE === "34").DATAVIEW > 0 && (
              <>
                <div className="flex justify-start items-center">
                  <FieldWrapper>
                    <Field
                      name={"SPLRCODE"}
                      component={TextBoxField}
                      label={"Nhà cung cấp"}
                    />
                  </FieldWrapper>
                  <FieldWrapper>
                    <Field
                      name={"SPLRNAME"}
                      component={TextBoxField}
                      label={"Tên NCC"}
                    />
                  </FieldWrapper>
                  <FieldWrapper>
                    <Field
                      name={"CURRPRCE"}
                      component={NonNegativeNumericInput}
                      label={"Số tiền"}
                    />
                  </FieldWrapper>
                </div>
              </>
            )}

            {/* Nhóm tùy chọn detail 6 - Mã nhóm: 36 */}
            {DcmnView.find((x) => x.DATACODE === "36").DATAVIEW > 0 && (
              <>
                <div className="flex justify-start items-center">
                  <FieldWrapper>
                    <Field
                      name={"COSTTYPE"}
                      component={TextBoxField}
                      label={"Loại đ.tượng n.bộ"}
                    />
                  </FieldWrapper>
                  <FieldWrapper>
                    <Field
                      name={"COSTCODE"}
                      component={TextBoxField}
                      label={"Mã đ.tượng n.bộ"}
                    />
                  </FieldWrapper>
                  <FieldWrapper>
                    <Field
                      name={"COSTTPNM"}
                      component={TextBoxField}
                      label={"Tên đ.tượng n.bộ"}
                    />
                  </FieldWrapper>
                </div>
              </>
            )}

            {/* Nhóm tùy chọn detail 7 - Mã nhóm: 37 */}
            {DcmnView.find((x) => x.DATACODE === "37").DATAVIEW > 0 && (
              <>
                <div className="flex justify-start items-center">
                  <FieldWrapper>
                    <Field
                      name={"CRT_TYPE"}
                      component={ComboboxField}
                      label={"Loại chi phí"}
                      data={lstYesOrNo}
                      textField={"ITEMNAME"}
                      dataItemKey={"ITEMCODE"}
                    />
                  </FieldWrapper>
                  <FieldWrapper>
                    <Field
                      name={"TAX_RATE"}
                      component={NonNegativeNumericInput}
                      label={"Thuế suất(%)"}
                      validator={taxRateValueValidator}
                    />
                  </FieldWrapper>
                  <FieldWrapper>
                    <Field
                      name={"VAT_CRAM"}
                      component={NonNegativeNumericInput}
                      label={"Tiền thuế"}
                    />
                  </FieldWrapper>
                </div>

                <div className="flex justify-start items-center">
                  <FieldWrapper>
                    <Field
                      name={"VAT_AMNT"}
                      component={NonNegativeNumericInput}
                      label={"Tiền thuế (VNĐ)"}
                    />
                  </FieldWrapper>
                  <FieldWrapper>
                    <Field
                      name={"VAT_OPTN"}
                      component={NonNegativeNumericInput}
                      label={"Loại hóa đơn"}
                    />
                  </FieldWrapper>
                  <FieldWrapper>
                    <Field
                      name={"TAX_RANM"}
                      label={"Thuế suất(%)"}
                      component={ComboboxField}
                      data={lstSpndSgDtTaxRaNm}
                      textField={"ITEMNAME"}
                      dataItemKey={"ITEMCODE"}
                    />
                  </FieldWrapper>
                </div>
              </>
            )}
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
