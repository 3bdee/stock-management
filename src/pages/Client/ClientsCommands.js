import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";

import Navbar from "../../Components/Navbar/Navbar";
import Widget from "../../Components/Widget/Widget";
import TotalCommand from "../../Components/TotalCommand/TotalCommand";
import Graph from "../../Components/GraphCommand/Graph";
import CommandTable from "../../Components/CommandTable/CommandTable";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AddCommandCli from "../../Components/AddCommandCli/AddCommandCli";
function ClientsCommands() {
  return (
    <div className="Dashboard">
      <Sidebar />
      <div className="MainContent">
        <Navbar />

        <AddCommandCli />
      </div>
    </div>
  );
}

export default ClientsCommands;
