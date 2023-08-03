import React, { useState } from "react";
import Header from "../partials/Header";
import FooterLess from "../partials/footer/FooterLess";
import Sidebar from "../partials/Sidebar";
import { useStateContext } from "../context/ContextProvider";
const Layout = ({ children }) => {
  const { sidebarOpen, setSidebarOpen } = useStateContext();
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>{children}</main>
        <FooterLess />
      </div>
    </div>
  );
};

export default Layout;
