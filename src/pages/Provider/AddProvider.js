import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./AddProvider.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { doc, addDoc, collection, setDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase/Firebase-config";
import { useState } from "react";
import { toast } from "react-toastify";

function AddProvider() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const addFourni = async (e) => {
    if (!email || !name || !phone || !address) {
      toast.error("missed field");
    }
    try {
      const res = await addDoc(collection(db, "Fournisseur"), {
        f_nom: name,
        f_email: email,
        f_adresse: address,
        f_telephone: phone,
        f_admin_id: JSON.parse(localStorage.getItem("user"))["uid"],
      });
      toast.success("Fournisseur est ajouté");
    } catch (err) {
      console.log(err);
    }
    e.target.reset();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="addProvider">
      <Button className="pop" onClick={handleOpen}>
        <PersonAddIcon />
        <span>Add</span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="popContainer" sx={style}>
          <Typography
            className="popHeader"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Add Provider
          </Typography>
          <Typography
            className="popInputs"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <form onSubmit={addFourni} className="addF">
              <input
                type="text"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="address"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="phone"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="e-mail"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                style={{ textAlign: "center", color: "green" }}
              >
                <AddBoxIcon />
              </button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default AddProvider;
