import React, { useEffect, useState } from "react";
import "./Widget.css";
import GroupsIcon from "@mui/icons-material/Groups";
import PieChart from "react-minimal-pie-chart";
import CategoryIcon from "@mui/icons-material/Category";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { collection, collectionGroup, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/Firebase-config";
import { Link } from "react-router-dom";
function Widget({ type }) {
  const [users, setUsers] = useState(0);
  const [cat, setCat] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const usr = await getDocs(collection(db, "Users"));
        const cats = await getDocs(collection(db, "Categories"));
        setUsers(usr.docs.length);
        setCat(cats.docs.length);
      } catch (err) {
        console.log(err);
      }
    };
    // return () => {
    //   setData({});
    // };
    fetchData();
  }, []);
  const [product, setProduct] = useState(0);
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
        setProduct(products.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, []);

  let data;
  switch (type) {
    case "users":
      data = {
        class: "users1 Widget",
        title: "Users",
        isMoney: false,
        link: "Go Analytics",
        barValue: users,
        icon: <GroupsIcon className="icon" />,
        // background: rgb(131,58,180),
        // background-image: linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%);
        // background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
        // background-image: linear-gradient(to right, #9be15d 0%, #00e3ae 100%);
        bg: "linear-gradient(to right, #9be15d 0%, #00e3ae 100%)",
      };
      break;
    case "pro":
      data = {
        class: "product1 Widget",
        title: "Products",
        isMoney: false,
        link: "Go Analytics",
        barValue: product,
        icon: <CategoryIcon className="icon" />,
        // background-image: linear-gradient(to right, #00dbde 0%, #fc00ff 100%);
        bg: "#fcc21496",
      };
      break;
    case "product":
      data = {
        class: "product1 Widget",
        title: "Categories",
        isMoney: false,
        link: "Go Analytics",
        barValue: cat,
        icon: <CategoryIcon className="icon" />,
        // background-image: linear-gradient(to right, #00dbde 0%, #fc00ff 100%);
        bg: "#fcc21496",
      };
      break;
    default:
      break;
  }

  return (
    <div className={data.class} style={{ background: data.bg }}>
      <div className="left">
        <span className="title">{data.title}</span>
        <Link to="/Analytics" className="link">
          {data.link}
        </Link>
      </div>
      <div className="center">
        <CircularProgressbar value={data.barValue} text={`${data.barValue}%`} />
      </div>
      <div className="right">
        <div className="percentage positive">10%</div>
        {data.icon}
      </div>
    </div>
  );
}

export default Widget;
