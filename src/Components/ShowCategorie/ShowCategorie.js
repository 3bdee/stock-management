import React from "react";
import "./ShowCategorie.css";
import "./card.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  increment,
  deleteDoc,
  where,
  getDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../Firebase/Firebase-config";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
function ShowCategorie() {
  const { ids } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const cmd = onSnapshot(
      collection(db, "Categories", ids, "produits"),
      (snapshot) => {
        let products = [];
        snapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
          // doc.data() is never undefined for query doc snapshots
        });
        setProduct(products);
      }
    );
    return () => cmd();
    // const fetchProduct = async () => {
    //   let products = [];
    //   try {
    //     const querySnapshot = await getDocs(
    //       collection(db, "Categories", ids, "produits")
    //     );
    //     querySnapshot.forEach((doc) => {
    //       products.push({ id: doc.id, ...doc.data() });
    //     });
    //     setProduct(products);
    //     console.log(product);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchProduct();
  }, []);

  const [cat, setCat] = useState({});
  useEffect(() => {
    const cmd = onSnapshot(collection(db, "Categories"), (snapshot) => {
      let cats = [];
      snapshot.forEach((doc) => {
        if (doc.id === ids) cats.push({ id: doc.id, ...doc.data() });
        // doc.data() is never undefined for query doc snapshots
      });
      setCat(cats);
    });
    return () => cmd();
    // const fetchCats = async () => {
    //   let cats = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "Categories"));
    //     querySnapshot.forEach((doc) => {
    //       if (doc.id === ids) cats.push({ id: doc.id, ...doc.data() });
    //       // doc.data() is never undefined for query doc snapshots
    //     });
    //     setCat(cats);
    //     console.log(cat);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchCats();
  }, []);
  const [edit, setEdit] = useState(true);
  const deleteProduct = async (id, cat) => {
    let path = "Categories/" + cat + "/produits";
    if (window.confirm("Are you sure you want to delete")) {
      await deleteDoc(doc(db, path, id));
      await updateDoc(doc(db, "Categories", cat), {
        cat_quantite: increment(-1),
      });
    }
  };
  return (
    <div className="users">
      <Sidebar />
      <div className="MainContent">
        <Navbar />
        <div className="btn-add">
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            style={{ color: "green", margin: "20px" }}
          >
            {" "}
            <Link
              to="/AddProduct"
              style={{ textDecoration: "none", textTransform: "capitalize" }}
            >
              {" "}
              Add
            </Link>
          </Button>
        </div>
        {Object.keys(cat).length ? (
          <div className="catDesc">
            <img className="img" src={cat[0].cat_img} alt="dd" />
            <div className="desc">
              <TextField
                label="nom"
                color="warning"
                defaultValue={cat[0].cat_nom}
                disabled={edit}
                variant="standard"
                focused
              />
              <div className="oneDesc">
                <TextField
                  label="Quantity"
                  color="warning"
                  type="number"
                  defaultValue={cat[0].cat_quantite}
                  disabled={edit}
                  variant="standard"
                  focused
                />
                <TextField
                  label="Max Quantity"
                  color="warning"
                  type="number"
                  defaultValue={cat[0].cat_max}
                  disabled={edit}
                  variant="standard"
                  focused
                />
              </div>
              <TextField
                fullWidth
                label="description"
                color="success"
                defaultValue={cat[0].cat_description}
                disabled={edit}
                variant="standard"
                focused
              />

              <div className="action">
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => setEdit(!edit)}
                >
                  {edit ? (
                    <EditIcon fontSize="inherit" />
                  ) : (
                    <EditOffIcon fontSize="inherit" />
                  )}
                </IconButton>
                <IconButton aria-label="delete" size="large">
                  <DoneOutlineIcon fontSize="inherit" />
                </IconButton>
              </div>
            </div>
          </div>
        ) : (
          <div className="catDesc"></div>
        )}
        <div className="listProduct">
          {Object.keys(product).map((id, index) => {
            return (
              <div key={id} className="wrapep">
                {/* <div className="imgBx">
                  <img src={product[index].p_img} alt="dd" />
                </div>
                <div className="imgDesc">
                  <h2>{product[index].p_nom}</h2>
                  <p>{product[index].p_description}</p>
                </div>
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => deleteProduct(product[index].id)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton> */}

                <div className="car">
                  <img src={product[index].p_img} alt="dd" />
                  <div className="infocar">
                    <h1>{product[index].p_nom}</h1>
                    <p>{product[index].p_description}</p>
                    <IconButton
                      className="button"
                      aria-label="delete"
                      size="large"
                      onClick={() =>
                        deleteProduct(
                          product[index].id,
                          product[index].p_categorie
                        )
                      }
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ShowCategorie;
