import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./charts/ChartjsConfig";
import "./css/style.css";

// Import pages
import Dashboard from "./pages/Dashboard";
import {
  BillPaymentRequestList,
  BillPaymentRequestEdit,
  Login,
  OrderList,
  ServiceContactsList,
  ServiceContactsEdit,
  AdvanceProposalList,
  AdvanceProposalEdit,
  AskPermissionList,
  AskPermissionEdit,
  BusinessRegistrationList,
  BusinessRegistrationEdit,
  SwitchShiftList,
  SwitchShiftEdit,
} from "./pages";
import Logout from "./partials/Logout/Logout";
import Header from "./partials/Header";
import FooterLess from "./partials/footer/FooterLess";
import Sidebar from "./partials/Sidebar";
import OrderCustomerList from "./pages/OrderCustomer/OrderCustomerList";
import RetailBillList from "./pages/HDBHD/RetailBillList";

import { useStateContext } from "./context/ContextProvider";

import "@progress/kendo-theme-default/dist/all.css";
function App() {
  const { userData } = useStateContext();
  const { sidebarOpen, setSidebarOpen } = useStateContext();

  return (
    // <Router>
    //   {localStorage.getItem("userData") == null ? (
    //     <Login />
    //   ) : (
    //     <Routes>
    //       <Route path="/" element={<Dashboard />} />
    //       <Route path="/home" element={<Dashboard />} />
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/logout" element={<Logout />} />
    //       <Route path="/order-customer" element={<OrderList />} />
    //     </Routes>
    //   )}
    // </Router>

    <Router>
      {localStorage.getItem("userData") == null ? (
        <Login />
      ) : (
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Content area */}
          {/* <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden rounded m-1 bg-white"> */}
          <div className="relative flex flex-col flex-1 overflow-hidden rounded m-1 bg-white">
            {/*  Site header */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="content-wrapper bg-white px-4 sm:px-2 overflow-y-auto overflow-x-hidden">
              <Routes>
                <Route path="/" element={<RetailBillList />} />
                <Route path="/home" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/order-customer" element={<OrderList />} />
                <Route path="/order-end-user" element={<OrderCustomerList />} />
                <Route path="/spnd-sgst" element={<BillPaymentRequestList />} />

                {/*  Đề nghị thanh toán */}
                <Route
                  path="/spnd-sgst/new"
                  element={<BillPaymentRequestEdit mode={"ADD"} />}
                />
                <Route
                  path="/spnd-sgst/:id"
                  element={<BillPaymentRequestEdit mode={"EDIT"} />}
                />

                {/*  Liên hệ công vụ */}
                <Route path="/dcmn-work" element={<ServiceContactsList />} />
                <Route
                  path="/dcmn-work/new"
                  element={<ServiceContactsEdit mode={"ADD"} />}
                />
                <Route
                  path="/dcmn-work/:id"
                  element={<ServiceContactsEdit mode={"EDIT"} />}
                />

                {/*  Tạm ứng */}
                <Route path="/advn-invc" element={<AdvanceProposalList />} />
                <Route
                  path="/advn-invc/new"
                  element={<AdvanceProposalEdit mode={"ADD"} />}
                />
                <Route
                  path="/advn-invc/:id"
                  element={<AdvanceProposalEdit mode={"EDIT"} />}
                />

                {/*  Nghỉ phép */}
                <Route path="/dcmn-leave" element={<AskPermissionList />} />
                <Route
                  path="/dcmn-leave/new"
                  element={<AskPermissionEdit mode={"ADD"} />}
                />
                <Route
                  path="/dcmn-leave/:id"
                  element={<AskPermissionEdit mode={"EDIT"} />}
                />

                {/* Công tác */}
                <Route
                  path="/task-schedule"
                  element={<BusinessRegistrationList />}
                />
                <Route
                  path="/task-schedule/new"
                  element={<BusinessRegistrationEdit mode={"ADD"} />}
                />
                <Route
                  path="/task-schedule/:id"
                  element={<BusinessRegistrationEdit mode={"EDIT"} />}
                />

                {/* Đổi ca */}
                <Route path="/doi-ca" element={<SwitchShiftList />} />
                <Route
                  path="/doi-ca/new"
                  element={<SwitchShiftEdit mode={"ADD"} />}
                />
                <Route
                  path="/doi-ca/:id"
                  element={<SwitchShiftEdit mode={"EDIT"} />}
                />
              </Routes>
            </div>
            <FooterLess />
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
