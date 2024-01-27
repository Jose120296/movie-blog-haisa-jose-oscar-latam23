import React from "react";

export const Footer = () => (
  <footer className="footer bg-dark text-white mt-5 py-4 fixed-bottom">
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <h5>Pendiente Nombre</h5>
          <p>Pendiente Descripción</p>
          <p>Expirience Movie</p>
          <button className="btn btn-primary">SEE ALL OFFERS AND PROMOTIONS</button>
        </div>
        <div className="col-md-3">
          <h5>ABOUT US</h5>
          <p>Nulla consequat massa vitae enim. Nullam ac tortor vitae purus faucibus</p>
        </div>
        <div className="col-md-3">
          <h5>Movies</h5>
          <ul className="list-unstyled">
            <li><a href="#" className="text-reset">Lorem impsum dolor sit amet</a></li>
            <li><a href="#" className="text-reset">Consector adispicing elit</a></li>
            <li><a href="#" className="text-reset">Sed do eiusmod tempor</a></li>
            <li><a href="#" className="text-reset">Incididunt ut labore</a></li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5>INFO</h5>
          <ul className="list-unstyled">
            <li><a href="#" className="text-reset">Lorem impsum dolor sit amet</a></li>
            <li><a href="#" className="text-reset">Consector adispicing elit</a></li>
            <li><a href="#" className="text-reset">Sed do eiusmod tempor</a></li>
            <li><a href="#" className="text-reset">Incididunt ut labore</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="text-center">
      <button className="btn btn-primary d-block mx-auto">Check the Context in action</button>
    </div>
  </footer>
);