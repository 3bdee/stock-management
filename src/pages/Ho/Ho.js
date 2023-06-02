import React from "react";
import "./Ho.css";
import "bootstrap/dist/css/bootstrap.min.css";
import IMM from "./IMM.jpg";
import { Link } from "react-router-dom";

function Ho() {
  return (
    <div className="website">
      <section id="nav_bar ">
        <nav className="navbar1 navbar-expand-lg navbar-light  ">
          <div className="container-fluid">
            <a className="navbar-brand " href="#">
              GSR
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle "
            >
              <i className="fa fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item ">
                  <a className="nav-link " href="#top">
                    HOME
                  </a>
                </li>
                <li className="nav-item ">
                  <a className="nav-link " href="#service">
                    SERVICES
                  </a>
                </li>
                <li className="nav-item ">
                  <a className="nav-link " href="#footer">
                    ABOUT US
                  </a>
                </li>
                <li className="nav-item ">
                  <a className="nav-link " href="#contact">
                    CONTACT{" "}
                  </a>
                </li>
                <Link className="nav-link " to="/Login">
                  <li className="nav-item ">LOGIN</li>
                </Link>
              </ul>
            </div>
          </div>
        </nav>
      </section>
      <div id="slider">
        <div
          id="headerSlider"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                class="d-block   w-100  img-fluid"
              />
              <div className="carousel-caption">
                <h3>GESTION DE STOCK</h3>
                <p>Centralisation de tous les stocks</p>
                <button className="btn btn-primary">GET STARTED</button>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1606189934390-2b10bb7f8094?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                class="d-block w-100  img-fluid"
              />
            </div>
            <div className="carousel-caption">
              <h3>GESTION DE STOCK</h3>
              <p>Centralisation de tous les stocks</p>
              <Link to="/Login" style={{ textDecoration: "none" }}>
                <button className="btn btn-primary">GET STARTED</button>
              </Link>
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                class="d-block w-100  img-fluid"
              />
            </div>
            <div className="carousel-caption">
              <h3>GESTION DE STOCK</h3>
              <p>Centralisation de tous les stocks</p>
              <button type="submit" className="btn btn-primary ">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      <section id="service">
        <div className="container">
          <div className="row">
            <div className="col-md-4 bg-white w-100 ">
              <h4>Renforcez la confiance dans votre gestion de stocks</h4>
              <p>
                {" "}
                Suivez facilement les niveaux d'inventire,surveillez les
                mouvements de stock et assurez-vous de leur exactitude,évitez
                les ruptures de stock et le surstockage,d'acquisition et
                d'améliorer la satisfacation des clients.
              </p>
              <img
                src="https://swiver.io/wp-content/uploads/2021/03/hero-stock.png"
                class="rounded mx-auto d-block"
              />
            </div>
            <div className="col-md-4 bg-white w-100 ">
              <i class="fa fa-clock-o" aria-hidden="true"></i>
              <h4>Traitement rapide des stocks</h4>
              <p>
                Traitement efficace et précis des réceptions de stocks,permet de
                recevoir et de traiter rapidement les nouveaux
                matériaux,réduisant ainsi les retards dans l'exécution des
                commandes .
              </p>
              <img
                src="https://static.doofinder.com/main-files/uploads/2021/02/producto-catalogo.png"
                class="rounded mx-auto d-block"
              />
            </div>
            <div className="col-md-4 bg-white w-100 ">
              <i class="fa fa-check-square-o" aria-hidden="true"></i>
              <h4>Traitement efficace des commandes</h4>
              <p>
                Efficacité accrue dans le prélèvement et l'emballage des
                matériaux pour les commandes sortantes ,en fonction des détails
                de la commande et de la disponibilité des stocks,réduisant anisi
                les erreurs et assurant une exécution précise des commandes.{" "}
              </p>
              <img
                src="https://www.aravis-informatique.com/wp-content/uploads/2021/02/groupe-51.png"
                class="rounded mx-auto d-block"
              />
            </div>

            <div className="col-md-4 bg-white w-100 ">
              <i class="fa fa-bell" aria-hidden="true"></i>
              <h4>Eviter les ruptures de stock</h4>
              <p>
                Réduction du risque de ruptures de stock en surveillant les
                niveaux de stock et en réapprovisionnant le stock si
                nécessaire,ce qui permet de maintenir des niveaux de stock
                optimaux et d'améliorer la satisfaction des clients.
              </p>
              <img
                src="https://www.syloe.com/wp-content/uploads/2022/01/image_infrastructure_informatique.png"
                class="rounded mx-auto d-block"
              />
            </div>

            <div id="contact">
              <div className="containar ">
                <h2>CONTACT US</h2>
                <div className="row">
                  <div className="col-md-6  ">
                    <form className="contact-from ">
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Phone number"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Your email"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <textarea
                          className="form-control"
                          rows="4"
                          placeholder="Message"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        SEND MESSAGE
                      </button>
                    </form>
                  </div>
                  <div className="col-md-6 contact-info">
                    <div className="follow">
                      <b> Address:</b>
                      <i class="fa fa-map-marker"></i> XYZ Agadir,Maroc, IN
                    </div>
                    <div className="follow">
                      <b>Phone:</b> <i class="fa fa-phone"></i> +2 33345566
                    </div>
                    <div className="follow">
                      <b>Email:</b>
                      <i class="fa fa-envelope-o"></i> example@gmail.com
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section id="footer">
              <h2>ABOUT US</h2>
              <div className="container">
                <div className="row">
                  <div className="col-md-4 footer-box">
                    <h4>MENU</h4>
                    <p>Home</p>
                    <p>Services</p>
                    <p>About</p>
                    <p>Contact</p>
                    <p>Login</p>
                  </div>
                  <div className="col-md-4 footer-box">
                    <h4>Contact</h4>
                    <p>
                      {" "}
                      <i class="fa fa-map-marker"></i>XZY,Agadir,Maroc
                    </p>
                    <p>
                      {" "}
                      <i class="fa fa-phone"></i> +2 33345566{" "}
                    </p>
                    <p>
                      {" "}
                      <i class="fa fa-envelope-o"></i>exemple@gmail.com
                    </p>
                  </div>
                  <div className="col-md-4 footer-box">
                    <h4> NEWSLETTER</h4>
                    <input
                      type="email"
                      className="from-control"
                      placeholder="your email"
                    />
                    <button type="button" className="btn btn-primary">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="copyright">
                <h4>GESTION DE STOCK DU RECHERCHE</h4>
                <p></p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ho;
