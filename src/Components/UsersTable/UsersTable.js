import * as React from "react";
//import "../ProviderTable/ProviderTable.css";
import "./UserTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddProvider from "../../pages/Provider/AddProvider";

import {
  doc,
  addDoc,
  collection,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { db } from "../../Firebase/Firebase-config";
import { DockOutlined } from "@mui/icons-material";
const columns = [
  { field: "id", headerName: "ID", width: 170 },
  {
    field: "LastName",
    headerName: "Last Name",
    width: 120,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="Image" src={params.row.Profile} alt="" />
          {params.row.LastName}
        </div>
      );
    },
  },
  {
    field: "Email",
    headerName: "Email",
    width: 180,
  },
  {
    field: "Phone",
    headerName: "Phone",
    width: 110,
  },
  {
    field: "Address",
    headerName: "Address",
    width: 300,
  },
];

function UsersTable() {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const userID = JSON.parse(localStorage.getItem("user"))["uid"];
        const querySnapshot = await getDocs(collection(db, "Users"));
        querySnapshot.forEach((doc) => {
          if (doc.id != userID) list.push({ id: doc.id, ...doc.data() });
          // doc.data() is never undefined for query doc snapshots
        });
        setData(list);
        console.log(list);
      } catch (err) {
        console.log(err);
      }
    };
    // return () => {
    //   setData({});
    // };
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete!!!")) {
      await deleteDoc(doc(db, "Users", id));
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <div className="deleteButton">
              <IconButton
                color="secondary"
                onClick={() => deleteUser(params.row.id)}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="myTab" style={{ margin: "10px" }}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default UsersTable;
