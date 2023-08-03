import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import FilterButton from "../partials/actions/FilterButton";
import Datepicker from "../partials/actions/Datepicker";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import FooterLess from "../partials/footer/FooterLess";
import { useStateContext } from "../context/ContextProvider";
function Dashboard() {
  const { sidebarOpen, setSidebarOpen } = useStateContext();

  // return (
  //   <div className="flex h-screen overflow-hidden">
  //     {/* Sidebar */}
  //     <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

  //     {/* Content area */}
  //     <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden rounded my-1">
  //       {/*  Site header */}
  //       <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  //       <div className="content-wrapper border rounded border-[#0d987a] bg-white my-1 p-2">
  //         <main>
  //           <div className="px-4 sm:px-6 lg:px-0 w-full max-w-9xl mx-auto">
  //             {/* Welcome banner */}
  //             <WelcomeBanner />

  //             {/* Dashboard actions */}
  //             <div className="sm:flex sm:justify-between sm:items-center mb-8">
  //               {/* Left: Avatars */}
  //               <DashboardAvatars />

  //               {/* Right: Actions */}
  //               <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
  //                 {/* Filter button */}
  //                 <FilterButton />
  //                 {/* Datepicker built with flatpickr */}
  //                 <Datepicker />
  //                 {/* Add view button */}
  //                 <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
  //                   <svg
  //                     className="w-4 h-4 fill-current opacity-50 shrink-0"
  //                     viewBox="0 0 16 16"
  //                   >
  //                     <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
  //                   </svg>
  //                   <span className="hidden xs:block ml-2">Add view</span>
  //                 </button>
  //               </div>
  //             </div>

  //             {/* Cards */}
  //             <div className="grid grid-cols-12 gap-6">
  //               {/* Line chart (Acme Plus) */}
  //               <DashboardCard01 />
  //               {/* Line chart (Acme Advanced) */}
  //               <DashboardCard02 />
  //               {/* Line chart (Acme Professional) */}
  //               <DashboardCard03 />
  //             </div>
  //           </div>
  //         </main>
  //       </div>
  //       <FooterLess />
  //     </div>
  //   </div>
  // );
  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-0 w-full max-w-9xl mx-auto">
        {/* Welcome banner */}
        <WelcomeBanner />

        {/* Dashboard actions */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          {/* Left: Avatars */}
          <DashboardAvatars />

          {/* Right: Actions */}
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            {/* Filter button */}
            <FilterButton />
            {/* Datepicker built with flatpickr */}
            <Datepicker />
            {/* Add view button */}
            <button className="btn bg-[#0d987a] hover:bg-[#c86805] text-white">
              <svg
                className="w-4 h-4 fill-current opacity-80 shrink-0 "
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="hidden xs:block ml-2">Add view</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-12 gap-6">
          {/* Line chart (Acme Plus) */}
          <DashboardCard01 />
          {/* Line chart (Acme Advanced) */}
          <DashboardCard02 />
          {/* Line chart (Acme Professional) */}
          <DashboardCard03 />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
