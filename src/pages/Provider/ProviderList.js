import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import ProviderTable from "../../Components/ProviderTable/ProviderTable";
import Sidebar from "../../Components/Sidebar/Sidebar";
import AddProvider from "./AddProvider";

import "./ProviderList.css";
function ProviderList() {
  return (
    <div className="users">
      <Sidebar />
      <div className="MainContent">
        <Navbar />
        <div className="pro">
          <AddProvider />
          <ProviderTable className="providertable" />
        </div>
      </div>
    </div>
  );
}

export default ProviderList;
