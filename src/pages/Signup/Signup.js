import React from "react";
import { useState, useEffect } from "react";
import "./Signup.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { doc, addDoc, collection, setDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { auth, db, storage } from "../../Firebase/Firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Signup() {
  const [file, setFile] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [profile, setProfile] = useState("");
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, "profiles/" + name);
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
            setProfile(downloadURL);
            console.log(profile);
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "Users", res.user.uid), {
        FirstName: fname,
        LastName: lname,
        Email: email,
        Password: password,
        Address: address,
        Phone: phone,
        Profile: profile,
        is_admin: false,
      });
      toast.success("well recorded 👌");
      setTimeout(() => {
        navigate("/Login");
      }, 200);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Sign Up</h1>
        </div>
        <div className="registration">
          <form onSubmit={handleSignup}>
            <div className="formImg">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
              <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>

            <div className="formInput">
              <input
                type="text"
                placeholder="first name"
                onChange={(e) => setFname(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="last name"
                onChange={(e) => setLname(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="e-mail"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
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
            </div>

            <button type="submit">Sign up</button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;
