import React from "react";
import "../../pages/Provider/AddProvider.css";
import Navbar from "../../Components/Navbar/Navbar";
import AddCardIcon from "@mui/icons-material/AddCard";
import SendIcon from "@mui/icons-material/Send";
import AddBoxIcon from "@mui/icons-material/AddBox";
import "../CategoriesList/CategoriesList.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./addCommandPro.css";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import autoTable from "jspdf-autotable";
import {
  doc,
  addDoc,
  collection,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../../Firebase/Firebase-config";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import avatar from "./kindpng_1369892.png";
import fsa from "./fsa agadir.png";
import jsPDF from "jspdf";

function AddCommandPro() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchEmails = async () => {
      let emails = [];
      try {
        const querySnapshot = await getDocs(collection(db, "Fournisseur"));
        querySnapshot.forEach((doc) => {
          emails.push({ id: doc.id, ...doc.data() });
          // doc.data() is never undefined for query doc snapshots
        });
        setEmail(emails);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmails();
  }, []);
  const { ids } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      let products = [];
      try {
        // const citiesRef = query(
        //   collection(db, "Categories"),
        //   where("cat_nom", "==", ids)
        // );
        const querySnapshot = await getDocs(
          collection(db, "Categories", ids, "produits")
        );
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
  const [fourni, setFourni] = useState("");
  const [four, setFour] = useState({});
  const handleSelect = (event) => {
    console.log(event.target.value);
    setFourni(event.target.value);
  };
  const [valu, setValu] = useState({});
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
  const pdfGenerate = () => {
    const doc = new jsPDF();

    // Set font type and size
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);

    // Add heading
    doc.text("Purchase Order", 105, 20, { align: "center" });

    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(20, 30, 190, 30);

    // Set font size to 14
    doc.setFontSize(14);

    // Add supplier info
    doc.text("Supplier:", 20, 50);
    doc.text("Acme Products", 60, 50);

    // Add order date info
    doc.text("Order Date:", 20, 60);
    doc.text("March 14, 2023", 60, 60);

    // Add delivery date info
    doc.text("Delivery Date:", 20, 70);
    doc.text("March 21, 2023", 60, 70);

    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(20, 80, 190, 80);

    // Set font size to 16
    doc.setFontSize(16);

    // Add order items table header
    doc.text("Qty", 20, 90);
    doc.text("Description", 50, 90);
    doc.text("Price", 130, 90);
    doc.text("Total", 170, 90);

    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(20, 95, 190, 95);

    // Add order items
    doc.text("2", 20, 105);
    doc.text("Widget A", 50, 105);
    doc.text("$10", 130, 105);
    doc.text("$20", 170, 105);

    doc.text("3", 20, 115);
    doc.text("Widget B", 50, 115);
    doc.text("$15", 130, 115);
    doc.text("$45", 170, 115);

    doc.text("1", 20, 125);
    doc.text("Widget C", 50, 125);
    doc.text("$20", 130, 125);
    doc.text("$20", 170, 125);

    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(20, 135, 190, 135);

    // Add total cost
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Total:", 130, 150);
    doc.text("$85", 170, 150);

    // Save PDF
    doc.save("purchase-order.pdf");
  };

  const pdfGenerate1 = () => {
    var doc = new jsPDF();
    // doc.setFontSize(30);
    // doc.setTextColor("red");
    // doc.text("BON DE COMMANDE", 10, 10);
    // doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);

    // Add heading
    doc.addImage(fsa, "PNG", 0, 0, 40, 40);
    doc.text("Purchase Order", 105, 20, { align: "center" });

    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(50, 30, 190, 30);

    doc.setFontSize(14);
    const desiredName = fourni;
    var e;
    var a;
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
    const year = currentDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    email.forEach((doc) => {
      if (doc.f_email == fourni) {
        console.log(doc.f_telephone);
        e = doc.f_nom;
        a = doc.f_adresse;
      }
    });
    // if (supplier) {
    //   console.log("Supplier Information:");
    //   console.log("Name:", supplier.name);
    //   console.log("Email:", supplier.email);
    //   console.log("Address:", supplier.address);
    //   console.log("Phone:", supplier.phone);
    // } else console.log("waloo" + desiredName);
    // Add supplier info
    doc.text("Supplier:", 20, 50);
    doc.text(e, 60, 50);

    // Add order date info
    doc.text("Order Date:", 20, 60);
    doc.text(formattedDate, 60, 60);

    // Add delivery date info
    doc.text("Email:", 20, 70);
    doc.text(fourni, 60, 70);

    doc.text("Address:", 20, 80);
    doc.text(a, 60, 80);

    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(20, 90, 190, 90);

    // doc.text("from", 10, 120);
    // doc.setTextColor("black");
    // doc.text("name", 10, 130);
    // doc.text("Email", 10, 140);
    // doc.text("Address", 10, 150);

    // doc.setTextColor("blue");
    // doc.text(user[0].LastName, 30, 130);
    // doc.text(user[0].Email, 30, 140);
    // doc.text(user[0].Address, 30, 150);

    // doc.setFontSize(8);

    // doc.text("to", 120, 120);
    // doc.setTextColor("black");
    // doc.text("name", 100, 130);
    // doc.text("Email", 100, 140);
    // doc.text("Address", 100, 150);

    // doc.setTextColor("blue");
    // doc.text("abdelmalek", 120, 130);
    // doc.text(fourni, 120, 140);
    // doc.text("HAY ENNAHDA BLOC A NR 488 DRARGA AGADIR", 120, 150);
    doc.setFont("Helvertica", "bold");
    doc.autoTable({
      html: "#tableCommand",
      startY: 110,
    });
    doc.save("test.pdf");
  };
  const getValue = (index) => {
    return document.querySelector("input[name=" + product[index].p_nom + "]")
      .value;
  };
  const handleChange = (e, index) => {
    const id = e.target.id;
    const value = e.target.value;
    setValu({ ...valu, [id]: value });
  };
  console.log("vaaa" + valu);

  return (
    <div className="users">
      <Sidebar />
      <div className="MainContent">
        <Navbar />
        <div className="pro">
          <div className="catHeader">
            <span></span>
            <h2>{ids}</h2>
          </div>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Provider</InputLabel>
            <Select
              style={{ width: "400px" }}
              labelId="demo-simple-select-label"
              id="selectFourni"
              value={fourni}
              label="Provider"
              onChange={handleSelect}
            >
              {Object.keys(email).map((id, index) => {
                return (
                  <MenuItem key={id} value={email[index].f_email}>
                    {email[index].f_email}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {/* {email.map((option) => (
              <MenuItem key={option.f_email} value={option.f_email}>
                {option.f_email}
              </MenuItem>
            ))} */}

          <div className="catCards">
            {Object.keys(product).map((id, index) => {
              return (
                // <div className="cards" key={id}>
                //   <img src={product[index].p_img} alt="" />

                //   <h2>{product[index].p_nom}</h2>
                // </div>
                <Card key={id} sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="ggg"
                    height="110"
                    image={product[index].p_img}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product[index].p_nom}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <TextField
                      label="quantity"
                      type="number"
                      id={index.toString()}
                      name="quan"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      min="1"
                      style={{
                        height: "0.4375em",
                        padding: "2.5px 9px",
                      }}
                      onChange={handleChange}
                    />
                  </CardActions>
                </Card>
              );
            })}
          </div>
          <Button
            onClick={pdfGenerate1}
            // onClick={pdfGenerate}
            variant="outlined"
            endIcon={<FileDownloadIcon />}
          >
            export
          </Button>
          <table style={{ display: "none" }} id="tableCommand">
            <thead>
              <tr>
                <th>#</th>
                <th>Categories</th>
                <th>Product</th>
                <th>Description</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(product).map((id, index) => {
                return (
                  <tr key={id}>
                    <td>{index}</td>
                    <td>{ids}</td>
                    <td>{product[index].p_nom}</td>
                    <td>{product[index].p_description}</td>
                    <td>{valu[index]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddCommandPro;
