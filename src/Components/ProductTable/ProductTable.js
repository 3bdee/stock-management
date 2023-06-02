import * as React from "react";
import "../ProviderTable/ProviderTable";
import { useState, useEffect } from "react";
import "./ProductTable.css";
import { Link } from "react-router-dom";
import {
  doc,
  addDoc,
  collection,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/Firebase-config";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Visibility from "@mui/icons-material/Visibility";
import { DockOutlined } from "@mui/icons-material";
function ProductTable() {
  // const [data, setData] = useState({});
  // useEffect(() => {
  //   const fetchData = async () => {
  //     let list = [];
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "Produit"));
  //       querySnapshot.forEach((doc) => {
  //         list.push({ id: doc.id, ...doc.data() });
  //       });
  //       setData(list);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);
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

  const deleteCat = async (id) => {
    if (window.confirm("message de confirmation")) {
      await deleteDoc(doc(db, "Categories", id));
    }
  };

  return (
    <div className="productContainer">
      {Object.keys(cat).map((id, index) => {
        return (
          <div key={id} className="card">
            <img src={cat[index].cat_img} alt="dd" />
            <div className="desc">
              <h3 className="catTitle">{cat[index].cat_nom}</h3>
              <p>{cat[index].cat_description}</p>
              <div className="action">
                <IconButton aria-label="delete" size="large">
                  <Link to={`/Product/${cat[index].id}`}>
                    <Visibility fontSize="inherit" />
                  </Link>
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => deleteCat(cat[index].id)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductTable;
