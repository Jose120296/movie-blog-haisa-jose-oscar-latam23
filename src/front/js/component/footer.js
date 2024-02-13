import React from "react";

export const Footer = () => (
  <footer className="footer" style={{backgroundColor: "rgba(0, 0, 0, 0)", color: "white", marginTop: "5rem", padding: "1rem"}}>
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <h5>Cine Verse</h5>
          <p>¿Te gustan las películas? ¿Quieres compartir tu opinión con otros cinéfilos? Entonces, esta es la red social que estabas buscando.</p>
          <p>Expirience Movie</p>
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
  </footer>
);