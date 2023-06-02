import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import {
  TextField,
  Box,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { PhotoCamera } from "@mui/icons-material";
import AddBox from "@mui/icons-material/AddBox";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  where,
  addDoc,
  collection,
  setDoc,
  doc,
  increment,
  getDocs,
  updateDoc,
  query,
} from "firebase/firestore";
import "./AddProduct.css";
import { db, storage } from "../../Firebase/Firebase-config";
function AddProduct() {
  const [categorie, setCat] = useState("");
  const [quantite, setQuan] = useState(0);
  const [file, setFile] = useState("");
  const [catImg, setCatImg] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [quant, setQuant] = useState(0);
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, "categories/" + name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setCatImg(downloadURL);
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  const addCategorie = async (e) => {
    e.preventDefault();
    try {
      const res = await setDoc(doc(db, "Categories", categorie), {
        cat_quantite: quantite,
        cat_img: catImg,
        cat_description: catDesc,
        cat_admin_id: JSON.parse(localStorage.getItem("user"))["uid"],
      });
      toast.success("bien enregistree 👌");
    } catch (err) {
      console.log(err);
      toast.error("quelque chose s'est mal passé 🚨");
    }
    e.target.reset();
  };
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const getCategories = async () => {
      let list = [];
      try {
        // const q = query(
        //   collection(db, "Categorie"),
        //   where(
        //     "cat_admin_id",
        //     "==",
        //     JSON.parse(localStorage.getItem("user"))["uid"]
        //   )
        // );
        const querySnapshot = await getDocs(collection(db, "Categories"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          console.log(list);
        });
        setCategories(list);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);
  const sel = document.getElementById("selectCategorie");
  const [pCat, setPCat] = useState("");
  const [pMax, setPMax] = useState(0);
  const [pQuan, setPQuan] = useState(1);
  const [pNom, setPNom] = useState("");
  const [pDesc, setPDesc] = useState("");

  const handleSelect = (event) => {
    console.log(event.target.value);
    setPCat(event.target.value);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    // const sel = document.getElementById("selectCategorie");
    // var opt;
    // for (var i = 0, len = sel.options.length; i < len; i++) {
    //   opt = sel.options[i];
    //   if (opt.selected === true) {
    //     setPCat(opt);
    //     console.log(opt);
    //     break;
    //   }
    // }

    const path = pCat + "/produits";
    try {
      const res = collection(db, "Categories");
      await addDoc(collection(res, pCat, "produits"), {
        p_max: pMax,
        p_quantite: pQuan,
        p_nom: pNom,
        p_admin_id: JSON.parse(localStorage.getItem("user"))["uid"],
        p_categorie: pCat,
        p_img: catImg,
        p_description: pDesc,
      });
      await updateDoc(doc(db, "Categories", pCat), {
        cat_quantite: increment(1),
      });
      toast.success("well recorded 👌");
    } catch (err) {
      console.log(err);
    }
    e.target.reset();
  };
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  return (
    <div className="users">
      <Sidebar />
      <div className="MainContent">
        <Navbar />
        <div className="pro">
          <div className="btns">
            <Button
              onClick={() => setShow(!show)}
              type="submit"
              variant="outlined"
              endIcon={<AddBox />}
            >
              Produit
            </Button>
            <Button
              onClick={() => setShow(!show)}
              type="submit"
              variant="outlined"
              endIcon={<AddBox />}
            >
              Categorie
            </Button>
          </div>

          {show ? (
            <Box
              component="form"
              onSubmit={addCategorie}
              className="addCategorie"
              noValidate
              autoComplete="off"
            >
              <div className="uploadPhoto">
                <img
                  className="cat_img"
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <PhotoCamera />
                </IconButton>
              </div>
              <div className="uploadPhoto">
                <TextField
                  id="outlined-basic"
                  label="Category"
                  variant="outlined"
                  onChange={(e) => setCat(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  type="number"
                  label="Qunatity"
                  variant="outlined"
                  onChange={(e) => setQuan(e.target.value)}
                />
              </div>
              <TextField
                fullWidth
                label="description"
                id="fullWidth"
                onChange={(e) => setCatDesc(e.target.value)}
              />
              <Button
                type="submit"
                color="success"
                variant="contained"
                endIcon={<TaskAltIcon />}
                className="addbtn"
              >
                add
              </Button>
              <ToastContainer />
            </Box>
          ) : null}
          {/* 
          partie du produit
          
          sefzerv================================
          dcsqdcv================================
          
          */}
          {!show ? (
            <Box
              component="form"
              onSubmit={addProduct}
              className="addCategorie"
              noValidate
              autoComplete="off"
            >
              <div className="uploadPhoto">
                <img
                  className="cat_img"
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <PhotoCamera />
                </IconButton>
              </div>
              <TextField
                fullWidth
                label="product"
                id="outlined-basic"
                variant="outlined"
                onChange={(e) => setPNom(e.target.value)}
              />
              <div className="uploadPhoto">
                <TextField
                  id="outlined-basic"
                  type="number"
                  label="Qunatity"
                  variant="outlined"
                  onChange={(e) => setPQuan(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  type="number"
                  label="Max"
                  variant="outlined"
                  onChange={(e) => setPMax(e.target.value)}
                />
              </div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="selectCategorie"
                  value={pCat}
                  label="Categories"
                  onChange={handleSelect}
                >
                  {Object.keys(categories).map((id, index) => {
                    return (
                      <MenuItem value={categories[index].id}>
                        {categories[index].id}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="description"
                id="fullWidth"
                onChange={(e) => setPDesc(e.target.value)}
              />
              <Button
                type="submit"
                color="success"
                variant="contained"
                endIcon={<TaskAltIcon />}
                className="addbtn"
              >
                add
              </Button>
            </Box>
          ) : null}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AddProduct;
