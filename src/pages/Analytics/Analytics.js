import React from "react";
import "./Analytics.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import "devextreme/dist/css/dx.light.css";
import {
  PieChart,
  Series,
  Label,
  Connector,
  Export,
  Size,
  Border,
} from "devextreme-react/pie-chart";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../Firebase/Firebase-config";
import { padding } from "@mui/system";
import Widget from "../../Components/Widget/Widget";
import Graph from "../../Components/GraphCommand/Graph";

function Analytics() {
  const [data, setData] = useState({});
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
          list.push({ id: doc.id, quan: doc.data().cat_quantite });
          console.log(doc.data().cat_quantite);
        });
        setData(list);
      } catch (err) {
        console.log(err);
      }
      console.log("data : " + data);
    };
    getCategories();
  }, []);
  const customizeText = (pointInfo) => {
    return pointInfo.value + " product";
  };

  const pointClickHandler = (e) => {
    toggleVisibility(e.target);
  };
  const legendClickHandler = (e) => {
    const arg = e.target;
    const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

    toggleVisibility(item);
  };

  const toggleVisibility = (item) => {
    item.isVisible() ? item.hide() : item.show();
  };
  return (
    <div className="Dashboard">
      <Sidebar />
      <div className="MainContent">
        <Navbar />
        <div className="widgets">
          <PieChart
            id="piee"
            dataSource={data}
            type="pie"
            title="Categories"
            palette="Bright"
            onPointClick={pointClickHandler}
            onLegendClick={legendClickHandler}
            style={{
              backgroundColor: "rgb(231 ,234, 250)",
              padding: "10px",
              height: "400px",
              borderRadius: "10px!important",
            }}
          >
            <Series argumentField="id" valueField="quan">
              <Label
                visible={true}
                position="columns"
                customizeText={customizeText}
              >
                <Connector visible={true} width={1} />
              </Label>
            </Series>
            <Size width={500} />
            <Border visible={true} color="red" dashStyle="dash" width={2} />
            <Export enabled={true} />
          </PieChart>
          {/* {Object.keys(data).map((id, index) => {
            return <p>{data[index].id}</p>;
          })} */}
          <div className="productCharts">
            <Widget type="users" />
            <Widget type="pro" />
          </div>
        </div>
        <div className="charts">
          <Graph />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
