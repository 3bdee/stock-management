import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Dashboard.css";
import Navbar from "../../Components/Navbar/Navbar";
import Widget from "../../Components/Widget/Widget";
import TotalCommand from "../../Components/TotalCommand/TotalCommand";
import Graph from "../../Components/GraphCommand/Graph";
function Dashboard() {
  return (
    <div className="Dashboard">
      <Sidebar />
      <div className="MainContent">
        <Navbar />
        <div className="widgets">
          <Widget type="users" />
          <Widget type="product" />
        </div>
        <div className="charts">
          <TotalCommand />
          <Graph />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
