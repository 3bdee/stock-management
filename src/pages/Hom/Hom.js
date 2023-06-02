import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="home">
      <div className="logo">
        <h2> GdS </h2>
      </div>
      <div className="navbar2">
        <li>
          <a href=""> Home </a>
        </li>
        <li>
          <a href="#"> About us </a>
        </li>
        <li>
          <a href="#"> Features</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </div>
      <div className="parent">
        <div className="getStarted">
          <h1>Gestion de stock</h1>
          <br />
          <h6>Centralisation de tous les stocks</h6>
          <br />
          <div className="other">
            <Link to="/Login" style={{ textDecoration: "none" }}>
              <button>get started</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
