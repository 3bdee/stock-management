import * as React from "react";
import "./ProviderTable.css";
import { useState, useEffect, useContext } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddProvider from "../../pages/Provider/AddProvider";
import {
  doc,
  addDoc,
  collection,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/Firebase-config";
import { DockOutlined } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";

const columns = [
  { field: "id", headerName: "ID", width: 170 },
  { field: "f_nom", headerName: "Name", width: 140 },
  { field: "f_email", headerName: "Email", width: 180 },
  {
    field: "f_telephone",
    headerName: "Phone",
    type: "number",
    width: 120,
  },
  {
    field: "f_adresse",
    headerName: "Address",
    type: "number",
    width: 220,
  },
];

function ProviderTable() {
  const [data, setData] = useState({});
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      let list = [];

      try {
        const querySnapshot = await getDocs(collection(db, "Fournisseur"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      } catch (err) {
        console.log(err);
      }
    };
    // return () => {
    //   setData({});
    // };
    fetchData();
  }, []);

  const deleteFourni = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      await deleteDoc(doc(db, "Fournisseur", id));
    }
  };

  const editFourni = async (id) => {};
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => deleteFourni(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="tableProvider">
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

export default ProviderTable;
