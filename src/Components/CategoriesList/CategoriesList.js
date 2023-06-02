import React from "react";
import "./CategoriesList.css";
import { useState, useEffect } from "react";
import { db } from "../../Firebase/Firebase-config";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  doc,
  addDoc,
  collection,
  setDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { Link } from "react-router-dom";
function CategoriesList() {
  const [cat, setCat] = useState({});
  useEffect(() => {
    const cmd = onSnapshot(collection(db, "Categories"), (snapshot) => {
      let cats = [];
      snapshot.forEach((doc) => {
        cats.push({ id: doc.id, ...doc.data() });
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
    //       cats.push({ id: doc.id, ...doc.data() });
    //       // doc.data() is never undefined for query doc snapshots
    //     });
    //     setCat(cats);
    //     console.log(cats);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchCats();
  }, []);
  const [show, setShow] = useState(false);
  return (
    <div className="categories">
      <div className="catHeader">
        <span></span>
        <h2>Categories</h2>
      </div>
      <div className="catCards">
        {Object.keys(cat).map((id, index) => {
          return (
            // <div className="cards" key={id}>
            //   <img src={product[index].p_img} alt="" />

            //   <h2>{product[index].p_nom}</h2>
            // </div>
            <Card
              key={id}
              sx={{ maxWidth: 345 }}
              onClick={() => setShow(!show)}
            >
              <CardMedia
                component="img"
                alt="ggg"
                height="140"
                image={cat[index].cat_img}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <Link to={`/ProviderOrders/${cat[index].id}`}>
                    {cat[index].cat_nom}
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          );
        })}
        {/* {Object.keys(cat).map((id, index) => {
          return (
            <div className="cards" key={id} onClick={() => setShow(!show)}>
              <img src={cat[index].cat_img} alt="" />
              <Link to={`/Product/${cat[index].id}`}>
                {" "}
                <h2>{cat[index].id}</h2>
              </Link>
            </div>
          );
        })} */}
      </div>
    </div>
  );
}

export default CategoriesList;
