import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import UsersTable from "../../Components/UsersTable/UsersTable";
import "./UsersList.css";
function UsersList() {
  return (
    <div className="users">
      <Sidebar />
      <div className="MainContent">
        <Navbar />
        <UsersTable />
      </div>
    </div>
  );
}

export default UsersList;
