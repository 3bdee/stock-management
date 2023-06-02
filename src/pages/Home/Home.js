import React from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap";
import { BorderColor } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Home() {
  // window.addEventListener('DOMContentLoaded', event => {

  //     // Navbarr shrink function
  //     var navbarrShrink = function () {
  //         const navbarrCollapsible = document.body.querySelector('#mainNav');
  //         if (!navbarrCollapsible) {
  //             return;
  //         }
  //         if (window.scrollY === 0) {
  //             navbarrCollapsible.classList.remove('navbarr-shrink')
  //         } else {
  //             navbarrCollapsible.classList.add('navbarr-shrink')
  //         }

  //     };

  //     // Shrink the navbarr
  //     navbarrShrink();

  //     // Shrink the navbarr when page is scrolled
  //     document.addEventListener('scroll', navbarrShrink);

  //     // Activate Bootstrap scrollspy on the main nav element
  //     // const mainNav = document.body.querySelector('#mainNav');
  //     // if (mainNav) {
  //     //     new bootstrap.ScrollSpy(document.body, {
  //     //         target: '#mainNav',
  //     //         rootMargin: '0px 0px -40%',
  //     //     });
  //     // };

  //     // Collapse responsive navbarr when toggler is visible
  //     const navbarrToggler = document.body.querySelector('.navbarr-toggler');
  //     const responsiveNavItems = [].slice.call(
  //         document.querySelectorAll('#navbarrResponsive .nav-link')
  //     );
  //     responsiveNavItems.map(function (responsiveNavItem) {
  //         responsiveNavItem.addEventListener('click', () => {
  //             if (window.getComputedStyle(navbarrToggler).display !== 'none') {
  //                 navbarrToggler.click();
  //             }
  //         });
  //     });

  //     // Activate SimpleLightbox plugin for portfolio items
  //     new SimpleLightbox({
  //         elements: '#portfolio a.portfolio-box'
  //     });

  // });

  return (
    <div>
      <body id="page-top" data-bs-spy="scroll" data-bs-target="#mainNav">
        {/*<!-- Navigation-->*/}
        <nav
          class="navbarr navbarr-expand-lg navbarr-light fixed-top py-3"
          id="mainNav"
        >
          <div class="container px-4 px-lg-5">
            <a class="navbarr-brand" href="#page-top">
              GSTOCK
            </a>
            <button
              class="navbarr-toggler navbarr-toggler-right"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarrResponsive"
              aria-controls="navbarrResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbarr-toggler-icon"></span>
            </button>
            <div class="collapse navbarr-collapse" id="navbarrResponsive">
              <ul class="navbarr-nav ms-auto my-2 my-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="#top">
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#about">
                    About
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#services">
                    Services
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#portfolio">
                    Portfolio
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/*<!-- Masthead-->*/}
        <header class="masthead">
          <div class="container px-4 px-lg-5 h-100">
            <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
              <div class="col-lg-8 align-self-end">
                <h1 class="text-white font-weight-bold">
                  GESTION DE STOCK D'UN LABORATOIRE DE RECHERCHE
                </h1>
                <hr class="divider" />
              </div>
              <div class="col-lg-8 align-self-baseline">
                <p class="text-white-75 mb-5">
                  Centralisation de tous les stocks!
                </p>
                <Link
                  style={{ backgroundColor: "#f4623a", borderColor: "#f4623a" }}
                  class="btn btn-primary  btn-xl"
                  to="/Login"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </header>
        {/*!-- About-->*/}
        <section
          class="page-section  "
          style={{ backgroundColor: "#f4623a" }}
          id="about"
        >
          <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
              <div class="col-lg-8 text-center">
                <h2 class="text-white mt-0">ABOUT US!</h2>
                <hr class="divider divider-light" />
                <p class="text-white-75 mb-4">
                  Suivez facilement les niveaux d'inventaire,surveillez les
                  mouvements de stock et assurez-vous de leur exactitude.Evitez
                  les ruptures de stock et le surstockage.Notre solution vous
                  aide à maintenir des niveaux de stocks optimaux,à éviter les
                  dépenses inutiles et à faire en sorte que vos clients aient
                  toujours accès les matériaux dont ils ont besoin.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/*<!-- Services-->*/}
        <section class="page-section" id="services">
          <div class="container px-4 px-lg-5">
            <h2 class="text-center mt-0">SERVICES</h2>
            <hr class="divider" />
            <div class="row gx-4 gx-lg-5">
              <div class="col-lg-3 col-md-6 text-center">
                <div class="mt-5">
                  <div class="mb-2">
                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                  </div>

                  <h3 class="h4 mb-2">Traitement rapide des stocks</h3>
                  <p class="text-muted mb-0">
                    Traitement efficace et précis des réceptions de
                    stocks,permet de recevoir et de traiter rapidement les
                    nouveaux matériaux,réduisant ainsi les retards dans
                    l'exécution des commandes .
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 text-center">
                <div class="mt-5">
                  <div class="mb-2">
                    <i class="bi-laptop fs-1 text-primary"></i>
                  </div>
                  <h3 class="h4 mb-2">Traitement efficace des commandes</h3>
                  <p class="text-muted mb-0">
                    Efficacité accrue dans le prélèvement et l'emballage des
                    matériaux pour les commandes sortantes ,en fonction des
                    détails de la commande et de la disponibilité des
                    stocks,réduisant anisi les erreurs et assurant une exécution
                    précise des commandes.
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 text-center">
                <div class="mt-5">
                  <div class="mb-2">
                    <i class="bi-globe fs-1 text-primary"></i>
                  </div>

                  <h3 class="h4 mb-2">Eviter les ruptures de stock</h3>
                  <p class="text-muted mb-0">
                    Réduction du risque de ruptures de stock en surveillant les
                    niveaux de stock et en réapprovisionnant le stock si
                    nécessaire,ce qui permet de maintenir des niveaux de stock
                    optimaux et d'améliorer la satisfaction des clients.
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 text-center">
                <div class="mt-5">
                  <div class="mb-2">
                    <i class="bi-heart fs-1 text-primary"></i>
                  </div>
                  <h3 class="h4 mb-2">Renforcez la confiance </h3>
                  <p class="text-muted mb-0">
                    Suivez facilement les niveaux d'inventire,surveillez les
                    mouvements de stock et assurez-vous de leur
                    exactitude,évitez les ruptures de stock et le
                    surstockage,d'acquisition et d'améliorer la satisfacation
                    des clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*<!-- Portfolio-->*/}
        <div id="portfolio">
          <div class="container-fluid p-0">
            <div class="row g-0">
              <div class="col-lg-4 col-sm-6">
                <a
                  class="portfolio-box"
                  href="https://static.wixstatic.com/media/af82ee_fcc67b0d66eb4d97a8ddd1b657b826b2~mv2.png/v1/fill/w_570,h_346,al_c,lg_1,q_85,enc_auto/laptop.png"
                  title="Project Name"
                >
                  <img
                    class="img-fluid"
                    src="https://img.freepik.com/photos-gratuite/femme-affaires-travaillant-ordinateur-portable_1388-91.jpg?size=626&ext=jpg&ga=GA1.2.1665095650.1680653582&semt=sph"
                    alt="..."
                  />
                  <div class="portfolio-box-caption">
                    <div class="project-category text-white-50">Category</div>
                    <div class="project-name">Material</div>
                  </div>
                </a>
              </div>
              <div class="col-lg-4 col-sm-6">
                <a
                  class="portfolio-box"
                  href="https://media.istockphoto.com/id/470882770/fr/photo/taper-sur-le-clavier.jpg?s=170667a&w=0&k=20&c=-5--Q4-91vgNaj7XgVo4zM1kxKsim41Y5cUc4tsQT-8="
                  title="Project Name"
                >
                  <img
                    class="img-fluid"
                    src="https://media.istockphoto.com/id/470882770/fr/photo/taper-sur-le-clavier.jpg?s=170667a&w=0&k=20&c=-5--Q4-91vgNaj7XgVo4zM1kxKsim41Y5cUc4tsQT-8="
                    alt="..."
                  />
                  <div class="portfolio-box-caption">
                    <div class="project-category text-white-50">Category</div>
                    <div class="project-name">Material</div>
                  </div>
                </a>
              </div>
              <div class="col-lg-4 col-sm-6">
                <a
                  class="portfolio-box"
                  href="https://us.123rf.com/450wm/deagreez/deagreez2110/deagreez211016197/176479924-photo-recadr%C3%A9e-de-mains-de-jeune-homme-utiliser-le-logiciel-de-test-de-codage-d-%C3%A9cran-d-%C3%A9cran-d.jpg?ver=6"
                  title="Project Name"
                >
                  <img
                    class="img-fluid"
                    src="https://media.istockphoto.com/id/470882770/fr/photo/taper-sur-le-clavier.jpg?s=170667a&w=0&k=20&c=-5--Q4-91vgNaj7XgVo4zM1kxKsim41Y5cUc4tsQT-8="
                    alt="..."
                  />
                  <div class="portfolio-box-caption">
                    <div class="project-category text-white-50">Category</div>
                    <div class="project-name">Material</div>
                  </div>
                </a>
              </div>
              <div class="col-lg-4 col-sm-6">
                <a
                  class="portfolio-box"
                  href="https://colterreed.com/wp-content/uploads/2014/02/Digital-Bookshelf.jpeg"
                  title="Project Name"
                >
                  <img
                    class="img-fluid"
                    src="https://colterreed.com/wp-content/uploads/2014/02/Digital-Bookshelf.jpeg"
                    alt="..."
                  />
                  <div class="portfolio-box-caption">
                    <div class="project-category text-white-50">Category</div>
                    <div class="project-name">Material</div>
                  </div>
                </a>
              </div>
              <div class="col-lg-4 col-sm-6">
                <a
                  class="portfolio-box"
                  href="https://www.studyinternational.com/wp-content/uploads/2022/09/shutterstock_292746704-1.jpg"
                  title="Project Name"
                >
                  <img
                    class="img-fluid"
                    src="https://t3.ftcdn.net/jpg/05/41/40/76/360_F_541407669_T88j7PwLRj3Z87SgKC34YP5adDRW3QFE.jpg"
                    alt="..."
                  />
                  <div class="portfolio-box-caption">
                    <div class="project-category text-white-50">Category</div>
                    <div class="project-name">Material</div>
                  </div>
                </a>
              </div>
              <div class="col-lg-4 col-sm-6">
                <a
                  class="portfolio-box"
                  href="https://www.unesco.org/sites/default/files/styles/paragraph_medium_desktop/public/2022-05/shutterstock_728675914.jpeg?itok=dUMPcwOX"
                  title="Project Name"
                >
                  <img
                    class="img-fluid"
                    src="https://www.unesco.org/sites/default/files/styles/paragraph_medium_desktop/public/2022-05/shutterstock_728675914.jpeg?itok=dUMPcwOX"
                    alt="..."
                  />
                  <div class="portfolio-box-caption p-3">
                    <div class="project-category text-white-50">Category</div>
                    <div class="project-name">Material </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/*<!-- Call to action-->*/}
        <section class="page-section bg-dark text-white">
          <div class="container px-4 px-lg-5 text-center">
            <h2 class="mb-4"> GESTION DE STOCK!</h2>
          </div>
        </section>
        {/*<!-- Contact-->*/}
        <section class="page-section" id="contact">
          <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
              <div class="col-lg-8 col-xl-6 text-center">
                <h2 class="mt-0">Contact US!</h2>
                <hr class="divider" />
              </div>
            </div>
            <div class="row gx-4 gx-lg-5 justify-content-center mb-5">
              <div class="col-lg-6">
                <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                  {/*<!-- Name input-->*/}
                  <div class="form-floating mb-3">
                    <input
                      class="form-control"
                      id="name"
                      type="text"
                      placeholder="Enter your name..."
                      data-sb-validations="required"
                    />
                    <label for="name">Full name</label>
                    <div
                      class="invalid-feedback"
                      data-sb-feedback="name:required"
                    >
                      A name is required.
                    </div>
                  </div>
                  {/*<!-- Email address input-->*/}
                  <div class="form-floating mb-3">
                    <input
                      class="form-control"
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      data-sb-validations="required,email"
                    />
                    <label for="email">Email address</label>
                    <div
                      class="invalid-feedback"
                      data-sb-feedback="email:required"
                    >
                      An email is required.
                    </div>
                    <div
                      class="invalid-feedback"
                      data-sb-feedback="email:email"
                    >
                      Email is not valid.
                    </div>
                  </div>
                  {/*<!-- Phone number input-->*/}
                  <div class="form-floating mb-3">
                    <input
                      class="form-control"
                      id="phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                      data-sb-validations="required"
                    />
                    <label for="phone">Phone number</label>
                    <div
                      class="invalid-feedback"
                      data-sb-feedback="phone:required"
                    >
                      A phone number is required.
                    </div>
                  </div>
                  {/*<!-- Message input-->*/}
                  <div class="form-floating mb-3">
                    <textarea
                      class="form-control"
                      id="message"
                      type="text"
                      placeholder="Enter your message here..."
                      data-sb-validations="required"
                    ></textarea>
                    <label for="message">Message</label>
                    <div
                      class="invalid-feedback"
                      data-sb-feedback="message:required"
                    >
                      A message is required.
                    </div>
                  </div>

                  {/*<!-- has successfully submitted-->*/}
                  <div class="d-none" id="submitSuccessMessage">
                    <div class="text-center mb-3">
                      <div class="fw-bolder">Form submission successful!</div>
                      To activate this form, sign up at
                      <br />
                      <a href="https://startbootstrap.com/solution/contact-forms">
                        https://startbootstrap.com/solution/contact-forms
                      </a>
                    </div>
                  </div>

                  {/*<!-- an error submitting the form-->*/}
                  <div class="d-none" id="submitErrorMessage">
                    <div class="text-center text-danger mb-3">
                      Error sending message!
                    </div>
                  </div>
                  {/*<!-- Submit Button-->*/}
                  <button
                    class="btn btn-primary btn-xl disabled"
                    style={{
                      backgroundColor: "#f4623a",
                      borderColor: "#f4623a",
                    }}
                    id="submitButton"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div class="row gx-4 gx-lg-5 justify-content-center"></div>
          </div>
        </section>
        {/*<!-- Footer-->*/}
        <footer class="bg-light py-5">
          <div class="container px-4 px-lg-5">
            <div class="small text-center text-muted">
              Copyright &copy; 2023 - Gestion de stock
            </div>
          </div>
        </footer>
      </body>
    </div>
  );
}

export default Home;
