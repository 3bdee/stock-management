import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { db } from "../../Firebase/Firebase-config";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SaveIcon from "@mui/icons-material/Save";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import PieChartIcon from "@mui/icons-material/PieChart";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  doc,
  addDoc,
  collection,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  collectionGroup,
} from "firebase/firestore";
import {
  Button,
  TextField,
  MenuItem,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Skeleton,
  Stack,
} from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#5f3a6bf0",
  border: "none",
  boxShadow: 24,
  p: 4,
};
function Sidebar() {
  const [user, setUser] = useState({});
  const userID = JSON.parse(localStorage.getItem("user"))["uid"];
  useEffect(() => {
    const fetchCats = async () => {
      let info = [];
      try {
        const querySnapshot = await getDocs(collection(db, "Users"));
        querySnapshot.forEach((doc) => {
          if (doc.id == userID) {
            info.push({ id: doc.id, ...doc.data() });
          }
          // doc.data() is never undefined for query doc snapshots
        });
        setUser(info);
        console.log(info);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCats();
  }, []);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/Login");
  };
  const [sel, setSel] = useState(false);

  return (
    <div className="Sidebar">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {!Object.keys(user).length ? (
              <Stack spacing={1}>
                {/* For variant="text", adjust the height via font-size */}
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                {/* For other variants, adjust the size with `width` and `height` */}
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>
            ) : (
              <div>
                <img src={user[0].Profile} alt="" />
                <h4>{user[0].Email}</h4>
                <table>
                  <tr>
                    <th>LastName</th>
                    <td>{user[0].LastName}</td>
                  </tr>
                  <tr>
                    <th>FirstName</th>
                    <td>{user[0].FirstName}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{user[0].Phone}</td>
                  </tr>
                </table>
              </div>
            )}
            {/*{" "}
            
             */}
          </Typography>
        </Box>
      </Modal>
      <Link to="/Dashboard" style={{ textDecoration: "none" }}>
        {Object.keys(user).length ? (
          <div className="top">
            <img src={user[0].Profile} alt="" />
            <h4>Admin</h4>
            <p>{user[0].LastName}</p>
          </div>
        ) : (
          <div className="top">
            <StoreIcon />
            <h4>Admin</h4>
            <p>Name</p>
          </div>
        )}
      </Link>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <Link to="/Dashboard" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">Client</p>
          <Link to="/UsersList" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon />
              <span>List</span>
            </li>
          </Link>
          <Link to="/CommandClient" style={{ textDecoration: "none" }}>
            <li>
              <PaymentIcon />
              <span>Orders</span>
            </li>
          </Link>
          <p className="title">Provider</p>
          <Link to="/Provider" style={{ textDecoration: "none" }}>
            <li className={sel ? "selPage" : ""} onClick={() => setSel(!sel)}>
              <StoreIcon />
              <span>List</span>
            </li>
          </Link>
          <Link
            to="/Provider/providerOrders"
            style={{ textDecoration: "none" }}
          >
            <li className={sel ? "selPage" : ""} onClick={() => setSel(!sel)}>
              <PaymentIcon />
              <span>Orders</span>
            </li>
          </Link>
          <p className="title">Else</p>
          <Link to="/Product" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/Analytics" style={{ textDecoration: "none" }}>
            <li>
              <PieChartIcon />
              <span>Analytics</span>
            </li>
          </Link>
          <p className="title">Profile</p>
          <li onClick={handleOpen}>
            <AccountCircleIcon />
            <span>Profile</span>
          </li>
          <li onClick={logout}>
            <LogoutIcon />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <ul></ul>
      </div>
    </div>
  );
}

export default Sidebar;
