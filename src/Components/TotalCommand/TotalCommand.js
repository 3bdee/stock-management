import React, { useState, useEffect } from "react";
import "./TotalCommand.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { db } from "../../Firebase/Firebase-config";
import { getDocs, collection } from "firebase/firestore";

function TotalCommand() {
  const [cmd, setCmd] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const cmds = await getDocs(collection(db, "C_commande"));
        setCmd(cmds.docs.length);
      } catch (err) {
        console.log(err);
      }
    };
    // return () => {
    //   setData({});
    // };
    fetchData();
  }, []);
  let per = (cmd * 100) / 50 + "%";
  return (
    <div className="totalCommand">
      <div className="top">
        <h1 className="title">Total Orders</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="circule">
          <CircularProgressbar text={cmd} value={cmd} />
        </div>
        <p className="title">Total Orders</p>
        <p className="total">{cmd}</p>
        <p>total orders since 4/5/2023</p>
      </div>
    </div>
  );
}

export default TotalCommand;
