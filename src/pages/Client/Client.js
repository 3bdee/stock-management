import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import { toast, ToastContainer } from "react-toastify";
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
  Tooltip,
} from "@mui/material";
import { db } from "../../Firebase/Firebase-config";
import {
  doc,
  addDoc,
  collection,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  onSnapshot,
  collectionGroup,
} from "firebase/firestore";

import Modal from "@mui/material/Modal";
import "./Client.css";
import { Link } from "react-router-dom";
import AddBox from "@mui/icons-material/AddBox";
import {} from "@mui/material";
import { useNavigate } from "react-router-dom";
const columns = [
  { field: "id", headerName: "ID", width: 180 },
  { field: "categorie_id", headerName: "Category", width: 180 },
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

function Client() {
  const [pCat, setPCat] = useState("");
  const [pMax, setPMax] = useState(0);
  const [pQuan, setPQuan] = useState(0);
  const [pNom, setPNom] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pImg, setPImg] = useState("");
  const userID = JSON.parse(localStorage.getItem("user"))["uid"];
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/Login");
  };
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
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <IconButton
              type="submit"
              color="primary"
              variant="outlined"
              aria-label="add"
              component="label"
              onClick={() => deleteCmd(params.row.id)}
            >
              <DeleteOutlineIcon fontSize="large" />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const [cat, setCat] = useState({});
  useEffect(() => {
    const fetchCats = async () => {
      let cats = [];
      try {
        const querySnapshot = await getDocs(collection(db, "Categories"));
        querySnapshot.forEach((doc) => {
          cats.push({ id: doc.id, ...doc.data() });
          // doc.data() is never undefined for query doc snapshots
        });
        setCat(cats);
        console.log(cats);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCats();
  }, []);
  const [commandes, setCommandes] = useState({});
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user"))["uid"];
    const q = query(collection(db, "C_commande"), where("c_id", "==", id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setCommandes(list);
    });

    return () => unsubscribe();
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     let list = [];
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "C_commande"));
  //       querySnapshot.forEach((doc) => {
  //         list.push({ id: doc.id, ...doc.data() });
  //       });
  //       setCommandes(list);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);
  const deleteCmd = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      await deleteDoc(doc(db, "C_commande", id));
    }
  };
  const [catID, setCatID] = useState("");
  const handleSelect = (event) => {
    console.log(event.target.value);
    setCatID(event.target.value);
  };
  const [product, setProduct] = useState({});
  const [cat_id, setCat_id] = useState("");
  const [pid, setpid] = useState("");
  const handleSelect2 = (event, catnom) => {
    console.log(event.target.value);
    setPNom(event.target.value);
    product.forEach((doc) => {
      if (doc.id == pNom) {
        setCat_id(doc.p_categorie);
        setPDesc(doc.p_description);
        setPImg(doc.p_img);
        setpid(doc.p_nom);
      }
    });
  };
  useEffect(() => {
    const fetchProduct = async () => {
      let products = [];
      try {
        // const querySnapshot = await getDocs(
        //   collection(db, "Categories", catID, "produits")
        // );
        const querySnapshot = await getDocs(collectionGroup(db, "produits"));
        querySnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });
        setProduct(products);
        console.log(products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, []);

  const addCmd = async (e) => {
    try {
      const res = await addDoc(collection(db, "C_commande"), {
        c_id: JSON.parse(localStorage.getItem("user"))["uid"],
        categorie_id: cat_id,
        produit_nom: pid,
        quantite: pQuan,
        produit_img: pImg,
        produit_id: pNom,
        c_date: new Date().toJSON().slice(0, 10),
        status: "in_progress",
      });
      toast.success("the command is added");
    } catch (err) {
      console.log(err);
    }
    e.target.reset();
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div ClassNames="Client" style={{ backgroundColor: "white" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {Object.keys(user).length ? (
              <div>
                <img src={user[0].Profile} alt="" />
                <h4>{user[0].Email}</h4>
                <table>
                  <tr>
                    <th>Name</th>
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
            ) : (
              <Stack spacing={1}>
                {/* For variant="text", adjust the height via font-size */}
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                {/* For other variants, adjust the size with `width` and `height` */}
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>
            )}
            {/*{" "}
            
             */}
          </Typography>
        </Box>
      </Modal>
      <div className="cliNav">
        <div className="CliWrap">
          <div className="CliSearch"></div>
          <div className="CliItems">
            <div className="CliItem">
              <Tooltip title="Logout">
                <IconButton
                  type="submit"
                  color="primary"
                  variant="outlined"
                  aria-label="ad"
                  component="label"
                  onClick={logout}
                  style={{
                    color: "#6610f2",
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className="CliItem">
              <Tooltip title="Profile">
                <IconButton
                  type="submit"
                  color="primary"
                  variant="outlined"
                  aria-label="add"
                  component="label"
                  onClick={handleOpen}
                  style={{
                    color: "#6610f2",
                  }}
                >
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="MainCmd">
        <div
          className="addBtn1"
          style={{ marginTop: "15px", marginRight: "20px" }}
        >
          <Button
            variant="outlined"
            type="submit"
            onClick={addCmd}
            startIcon={<AddBox />}
            style={{ textTransform: "capitalize" }}
          >
            add
          </Button>
        </div>
        <div className="commandAddition">
          <Box
            component="form"
            className="commandAddition"
            noValidate
            autoComplete="off"
            onSubmit={addCmd}
          >
            <FormControl>
              <InputLabel id="demo-simple-select-label">Produit</InputLabel>
              <Select
                className="sel"
                labelId="demo-simple-select-label"
                id="selectProduit"
                value={pNom}
                label="Product"
                style={{ width: "200px" }}
                onChange={handleSelect2}
              >
                {Object.keys(product).map((id, index) => {
                  return (
                    <MenuItem
                      className="item"
                      key={id}
                      value={product[index].id}
                    >
                      <img src={product[index].p_img} alt="" />
                      {product[index].p_nom}
                    </MenuItem>
                  );
                })}
                {/* <MenuItem value="1">produit</MenuItem>
                <MenuItem value="2">produit1</MenuItem> */}
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Category"
              variant="outlined"
              disabled
              value={cat_id}
            />
            <TextField
              id="outlined-basic"
              type="number"
              label="Qunatity"
              variant="outlined"
              focused
              value={pQuan}
              onChange={(e) => setPQuan(e.target.value)}
            />

            <TextField
              value={pDesc}
              disabled
              label="description"
              id="fullWidth"
            />
          </Box>
        </div>
        <div className="comTab">
          <div style={{ height: 400 }}>
            <DataGrid
              rows={commandes}
              columns={columns.concat(actionColumn)}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Client;
