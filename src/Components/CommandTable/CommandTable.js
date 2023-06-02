import * as React from "react";
import "../ProviderTable/ProviderTable.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DangerousIcon from "@mui/icons-material/Dangerous";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  doc,
  addDoc,
  collection,
  collectionGroup,
  onSnapshot,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/Firebase-config";
import { DockOutlined } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
const columns = [
  { field: "id", headerName: "ID", width: 180 },
  { field: "categorie_id", headerName: "Category", width: 130 },
  {
    field: "produit_nom",
    headerName: "Product",
    width: 180,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="Image" src={params.row.produit_img} alt="" />
          {params.row.produit_nom}
        </div>
      );
    },
  },
  {
    field: "quantite",
    headerName: "Quantity",
    type: "number",
    width: 90,
  },
  {
    field: "c_date",
    headerName: "Date",
    width: 110,
  },
  {
    field: "status",
    headerName: "Status",
    width: 180,
    renderCell: (params) => {
      return (
        <span className={`status ${params.row.status}`}>
          {params.row.status}
        </span>
      );
    },
  },
];
function CommandTable() {
  const [data, setData] = useState({});
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const cmd = onSnapshot(collectionGroup(db, "C_commande"), (snapshot) => {
      let list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
        // doc.data() is never undefined for query doc snapshots
      });
      setData(list);
    });
    return () => cmd();
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     // const querySnapshot = await getDocs(collection(db, "Fournisseur"));
    //     // querySnapshot.forEach((doc) => {
    //     //   list.push({ id: doc.id, ...doc.data() });
    //     //   // doc.data() is never undefined for query doc snapshots
    //     // });
    //     const q = query(collectionGroup(db, "C_commande"));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //       // doc.data() is never undefined for query doc snapshots
    //     });
    //     setData(list);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();
  }, []);

  const deleteCommand = async (id) => {
    if (window.confirm("Etes-vous sûr que vous voulez supprimer")) {
      await deleteDoc(doc(db, "C_commande", id));
    }
  };
  const refuseCommand = async (id) => {
    if (window.confirm("Etes-vous sûr que vous voulez refuser")) {
      await updateDoc(doc(db, "C_commande", id), {
        status: "refused",
      });
    }
  };
  const accepteCommand = async (id) => {
    if (window.confirm("Etes-vous sûr que vous voulez accepter")) {
      await updateDoc(doc(db, "C_commande", id), {
        status: "accepted",
      });
    }
  };

  const editFourni = async (id) => {};
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
              <Tooltip title="accept" placement="top-end">
                <IconButton
                  color="success"
                  onClick={() => accepteCommand(params.row.id)}
                >
                  <DoneOutlineIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Refuse" placement="top-end">
                <IconButton
                  color="error"
                  onClick={() => refuseCommand(params.row.id)}
                >
                  <DangerousIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="delete" placement="top-end">
                <IconButton
                  color="secondary"
                  onClick={() => deleteCommand(params.row.id)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="Dashboard">
      <Sidebar />
      <div className="MainContent">
        <Navbar />
        <div className="comTab" style={{ margin: "10px" }}>
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
      </div>
    </div>
  );
}

export default CommandTable;
