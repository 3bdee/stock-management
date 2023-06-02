import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import UsersTable from "../../Components/UsersTable/UsersTable";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ProductTable from "../../Components/ProductTable/ProductTable";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
function Product() {
  return (
    <div className="users">
      <Sidebar />
      <div className="MainContent">
        <Navbar />
        <div className="pro">
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            style={{ color: "blue", margin: "20px" }}
          >
            {" "}
            <Link to="/AddProduct" style={{ textDecoration: "none" }}>
              {" "}
              Add
            </Link>
          </Button>
          <ProductTable />
        </div>
      </div>
    </div>
  );
}

export default Product;
