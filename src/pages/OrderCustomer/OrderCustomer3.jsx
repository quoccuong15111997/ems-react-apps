import React from "react";
import "./OrderCustomer.css";

import WrapperItem from "./WrapperItem";

import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import { Input, NumericTextBox, TextArea } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";

const DcmnView = [
  {
    DCMNCODE: "DDHKH",
    OPTNVIEW: 255,
    PARAVIEW: "255",
    GRP_VIEW: [
      {
        GRP_CODE: "GRP_0001",
        DATAVIEW: 1,
        TEXTNOTE: "Chiết khấu hoa hồng: RDTNRATE, RDTNCRAM, CSCMRATE",
      },
      {
        GRP_CODE: "GRP_0002",
        DATAVIEW: 1,
        TEXTNOTE: " Xuất hóa đơn VAT: TAX_CODE, VAT_RATE, VAT_CRAM",
      },
      {
        GRP_CODE: "GRP_0003",
        DATAVIEW: 1,
        TEXTNOTE:
          " Thông tin giao hàng: DLVRMTHD, DLVRTYPE, DLVRDATE, DLVRHOUR, DLVRPLCE, DLVRADDR, RCVREMPL, RCVR_TEL",
      },
      {
        GRP_CODE: "GRP_0004",
        DATAVIEW: 1,
        TEXTNOTE: " Thông tin thanh toán: PAY_MTHD, PYMNPERD, PYMNNUMB",
      },
      {
        GRP_CODE: "GRP_0005",
        DATAVIEW: 1,
        TEXTNOTE: "Thông tin tiền vận chuyển: DlvrRate, DlvrCrAm, DlvrAmnt",
      },
      {
        GRP_CODE: "GRP_0006",
        DATAVIEW: 1,
        TEXTNOTE: "Kỳ hạn thanh toán: DlvrRate, DlvrCrAm, DlvrAmnt",
      },
      {
        GRP_CODE: "GRP_0007",
        DATAVIEW: 1,
        TEXTNOTE: "Thông tin đi kèm còn lại",
      },
    ],
    FLTRDATA: [],
  },
  {
    DCMNCODE: "HDXNP",
    OPTNVIEW: 2,
    PARAVIEW: "",
    GRP_VIEW: [
      {
        GRP_CODE: "GRP_0001",
        DATAVIEW: 0,
        TEXTNOTE: "Chấm công nhật: TimeLeav ",
      },
      {
        GRP_CODE: "GRP_0002",
        DATAVIEW: 1,
        TEXTNOTE: " Chấm công ca: TimeMorn,TimeAftr,TimeEven ",
      },
      {
        GRP_CODE: "GRP_0003",
        DATAVIEW: 0,
        TEXTNOTE: " Chấm công khoán: PrdcLeav",
      },
    ],
    FLTRDATA: [],
  },
  {
    DCMNCODE: "inpCustomer_New",
    OPTNVIEW: 0,
    PARAVIEW: "",
    GRP_VIEW: [
      {
        GRP_CODE: "GRP_0001",
        DATAVIEW: 1,
        TEXTNOTE:
          "Thông tin ngân hàng: BANKCODE,BANKLCTN,ACCTNUMB,SWFTCODE,CUST_VAT,CUSTPYMN ",
      },
      {
        GRP_CODE: "GRP_0002",
        DATAVIEW: 1,
        TEXTNOTE:
          "Thông tin cá nhân: RSDNADDR,BRTHDATE,GENDERCD,CMNDCODE,CMNDDATE,CMNDPLCE",
      },
    ],
    FLTRDATA: [],
  },
  {
    DCMNCODE: "THBHD",
    OPTNVIEW: 255,
    PARAVIEW: "666",
    GRP_VIEW: [
      {
        GRP_CODE: "GRP_0001",
        DATAVIEW: 1,
        TEXTNOTE: "Thông tin biên nhận:RFRNCODE,RFRNDATE ",
      },
      {
        GRP_CODE: "GRP_0002",
        DATAVIEW: 1,
        TEXTNOTE:
          " Thông tin địa điểm đến nhận hàng: DLVRCODE,DLVRDATE,DLVRCITY,DLVRDIST,DLVRWARD,DLVRSTRT,DLVRNUMB,DLVRNOTE,DLVRADDR,RETNTYPE,RLTNOBJC,RLTN_TEL,CUSTPHNE,CUSTCITY,CUSTDIST,CUSTWARD,CUSTSTRT,CUSTNUMB",
      },
      {
        GRP_CODE: "GRP_0003",
        DATAVIEW: 1,
        TEXTNOTE:
          " TT hóa đơn khi xuất trả: INVCCODE,INVCSIGN,INVCTEMP,INVCDATE,CUOMCODE,CUOMRATE,VAT_RATE,VAT_CRAM",
      },
      {
        GRP_CODE: "GRP_0004",
        DATAVIEW: 1,
        TEXTNOTE:
          " TT thanh toán số tiền trả hàng: PYMNTYPE,PYMNPERD,PYMNNUMB,PYMNDATE,PYMNACCT,PYMNBANK,RFRNTYPE,CRT_TYPE,RFRNDCTP",
      },
      {
        GRP_CODE: "GRP_0005",
        DATAVIEW: 1,
        TEXTNOTE: " Các thông tin khác:PRDCTYPE,RETNMEAN ",
      },
      {
        GRP_CODE: "GRP_0006",
        DATAVIEW: 1,
        TEXTNOTE:
          " Thông tin trị giá: SRC_DATA,SMMNCRAM,SMMNAMNT,SUM_CRFR,SUM_AMFR,FEE_CRAM,FEE_AMNT,RCPTCRAM,RCPTAMNT,RDTNRATE,RDTNCRAM,RDTNAMNT,CLR_CRAM,CLR_AMNT,SPRTCRAM,SPRTAMNT,SUM_CRAM,SUM_AMNT",
      },
    ],
    FLTRDATA: [],
  },
];

const OrderCustomer3 = () => {
  const DcmnViewDDH = DcmnView.find(
    (item) => item.DCMNCODE === "DDHKH"
  ).GRP_VIEW;

  const [tabSelected, setTabSelected] = React.useState(0);
  const handleTabSelect = (e) => {
    setTabSelected(e.selected);
  };

  return (
    <TabStrip
      selected={tabSelected}
      onSelect={handleTabSelect}
      className="Tab-flex"
    >
      <TabStripTab title="Thong tin Chung">
        <div className="order-customer">
          <div className="wrapper flex justify-between gap-4">
            <div
              className={`${
                DcmnViewDDH[6].DATAVIEW === 1 ? "basis-1/3" : "basis-1/2"
              }`}
            >
              <div className="wrapper-item">
                <WrapperItem>
                  <Label>Chi nhanh</Label>
                  <Input value="Chi nhanh Cong ty TNHH PIMA" disabled={true} />
                </WrapperItem>

                <WrapperItem>
                  <Label>Khach hang</Label>
                  <div style={{ width: "30%" }}>
                    <Input value="Ma Khach hang" disabled={true} />
                  </div>
                  <div style={{ width: "70%" }}>
                    <Input value="Ten Khach hang" disabled={true} />
                  </div>
                </WrapperItem>

                <div className="mb-2">
                  <Label>Dia chi</Label>
                  <TextArea
                    value="Duong so 9A, KDC Trung son, Binh Hung, Binh Chanh, TpHCM"
                    disabled={true}
                    rows={2}
                  />
                </div>

                <WrapperItem>
                  <Label>So dien thoai</Label>
                  <Input value="0987654321" disabled={true} />
                </WrapperItem>

                <WrapperItem>
                  <Label>Ma so thue</Label>
                  <Input value="0123456789" disabled={true} />
                </WrapperItem>

                <WrapperItem>
                  <Label>NV Ban hang</Label>
                  <Input value="Le Minh Loc" disabled={true} />
                </WrapperItem>
              </div>
            </div>

            <div
              className={`${
                DcmnViewDDH[6].DATAVIEW === 1 ? "basis-1/3" : "basis-1/2"
              }`}
            >
              <div className="wrapper-item">
                <WrapperItem>
                  <Label>Ma Don hang</Label>
                  <Input value="500012201010003" disabled={true} />
                </WrapperItem>

                <WrapperItem>
                  <Label>Ngay don hang</Label>
                  <Input value="01/01/2023" disabled={true} />
                </WrapperItem>

                <WrapperItem>
                  <Label>Tien hang</Label>
                  <NumericTextBox
                    value={1000000}
                    disabled={true}
                    className="numberic-right"
                  />
                </WrapperItem>

                <WrapperItem>
                  <Label>Thue suat</Label>
                  <NumericTextBox
                    value={10}
                    disabled={true}
                    width="200px"
                    className="numberic-right"
                  />
                  <NumericTextBox
                    value={100000}
                    disabled={true}
                    className="numberic-right"
                  />
                </WrapperItem>

                {DcmnViewDDH[4].DATAVIEW === 1 ? (
                  <WrapperItem>
                    <Label>Tien van chuyen</Label>
                    <NumericTextBox
                      value={10000}
                      disabled={true}
                      className="numberic-right"
                    />
                    <NumericTextBox
                      value={10}
                      disabled={true}
                      className="numberic-right"
                      width="200px"
                    />
                  </WrapperItem>
                ) : (
                  ""
                )}

                {DcmnViewDDH[0].DATAVIEW === 1 && (
                  <WrapperItem>
                    <Label>Tien Chiet khau</Label>
                    <NumericTextBox
                      value={10}
                      disabled={true}
                      className="numberic-right"
                      width="200px"
                    />
                    <NumericTextBox
                      value={100000}
                      disabled={true}
                      className="numberic-right"
                    />
                  </WrapperItem>
                )}

                <WrapperItem>
                  <Label>Tong Tien</Label>
                  <NumericTextBox
                    value={1000000}
                    disabled={true}
                    className="numberic-right"
                  />
                </WrapperItem>

                <WrapperItem>
                  <Label>Tong tien (VND)</Label>
                  <NumericTextBox
                    value={1000000}
                    disabled={true}
                    className="numberic-right"
                  />
                </WrapperItem>

                {DcmnViewDDH[5].DATAVIEW === 1 && (
                  <WrapperItem>
                    <Label>Ky han thanh toan</Label>
                    <NumericTextBox
                      value={3}
                      disabled={true}
                      className="numberic-right"
                      width="200px"
                    />
                    <Input value="Tháng" disabled={true} />
                  </WrapperItem>
                )}
              </div>
            </div>

            {DcmnViewDDH[6].DATAVIEW === 1 && (
              <div
                className={`${
                  DcmnViewDDH[6].DATAVIEW === 1 ? "basis-1/3" : "basis-1/2"
                }`}
              >
                <div className="wrapper-item">
                  <WrapperItem>
                    <Label>Tong SL</Label>
                    <NumericTextBox
                      value={100}
                      disabled={true}
                      className="numberic-right"
                    />
                  </WrapperItem>

                  <WrapperItem>
                    <Label>
                      Tong m<sup>2</sup> (TTN):
                    </Label>
                    <NumericTextBox
                      value={1200}
                      disabled={true}
                      className="numberic-right"
                    />
                  </WrapperItem>

                  <WrapperItem>
                    <Label>Tong Khoi luong (Kg) (TTN):</Label>
                    <NumericTextBox
                      value={120}
                      disabled={true}
                      className="numberic-right"
                    />
                  </WrapperItem>

                  <WrapperItem>
                    <Label>So PI Khach hang (TTN)</Label>
                    <Input value="RDS23-T05-001" disabled={true} />
                  </WrapperItem>

                  <WrapperItem>
                    <Label>Loai don hang (Pima/JYJ)</Label>
                    <Input value="Xuat khau/ Noi dia" disabled={true} />
                  </WrapperItem>

                  <WrapperItem>
                    <Label>Nhom Don hang (JYJ)</Label>
                    <Input
                      value="Hang tau/ Hang le/ Hang Cong trinh"
                      disabled={true}
                    />
                  </WrapperItem>
                </div>
              </div>
            )}
          </div>
        </div>
      </TabStripTab>

      {DcmnViewDDH[2].DATAVIEW === 1 && (
        <TabStripTab title="Thong tin Giao hang">
          <div className="wrapper flex justify-between gap-4">
            <div className="basis-1/2">
              <div className="wrapper-item">
                <WrapperItem>
                  <Label>Ngay gio giao hang</Label>
                  <Input value="31/05/2023 17:30" disabled={true} />
                </WrapperItem>

                <WrapperItem>
                  <Label>PT Giao hang</Label>
                  <Input value="Xe ba gác tới lấy hàng" disabled={true} />
                </WrapperItem>

                <WrapperItem>
                  <Label>Địa điểm nhận</Label>
                  <Input
                    value="Khu dân cư Trung Sơn, Bình Hưng, Bình Chánh"
                    disabled={true}
                  />
                </WrapperItem>

                <WrapperItem>
                  <Label>Ghi chú (TTN)</Label>
                  <Input
                    value="Khu dân cư Trung Sơn, Bình Hưng, Bình Chánh"
                    disabled={true}
                  />
                </WrapperItem>
              </div>
            </div>
            <div className="basis-1/2">
              <div className="wrapper-item">
                <WrapperItem>
                  <Label>Phương thức thanh toán</Label>
                  <Input
                    value="Khách hàng đã Chuyển khoản/ Thanh toán 50% tiền hàng"
                    disabled={true}
                  />
                </WrapperItem>

                <WrapperItem>
                  <Label>Địa điểm giao</Label>
                  <Input value="Nhà máy/ Chi nhánh/ Chành xe" disabled={true} />
                  <Input
                    value="Chi nhánh Pima/ Nhà xe Lê Hồng Phong"
                    disabled={true}
                  />
                </WrapperItem>

                <WrapperItem>
                  <Label>Người nhận</Label>
                  <Input value="Le Hiep Phuc" disabled={true} />
                  <Input value="0123456789" disabled={true} width="150px" />
                </WrapperItem>
              </div>
            </div>
          </div>
        </TabStripTab>
      )}
    </TabStrip>
  );
};

export default OrderCustomer3;
