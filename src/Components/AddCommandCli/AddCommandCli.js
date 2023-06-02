import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../../pages/Provider/AddProvider.css";
import AddCardIcon from "@mui/icons-material/AddCard";
import SendIcon from "@mui/icons-material/Send";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { doc, addDoc, collection, setDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../../Firebase/Firebase-config";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
function AddCommandCli() {
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
                  <Link to={`/Product/${cat[index].id}`}>{cat[index].id}</Link>
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
export default AddCommandCli;
