import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import ProviderTable from "../../Components/ProviderTable/ProviderTable";
import Sidebar from "../../Components/Sidebar/Sidebar";
import AddProvider from "./AddProvider";
import AddCommandPro from "../../Components/addCommandPro/addCommandPro";
import "./ProviderList.css";
import CategoriesList from "../../Components/CategoriesList/CategoriesList";
import { Link } from "react-router-dom";
function ProviderOrders() {
  return (
    <div className="users">
      <Sidebar />
      <div className="MainContent">
        <Navbar />
        <div className="pro">
          <CategoriesList />
        </div>
      </div>
    </div>
  );
}

export default ProviderOrders;
