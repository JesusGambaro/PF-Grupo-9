import React from "react";
import "../Css/Footer.css";
import logo from "../Images/logo2.png";

export default function Footer() {
  return (
    <footer className="footer-container">
      <img className="logoOwn" src={logo} alt="logo" />
      <div className="footer">
        

        <div className="icons-container-footer">
         <p className="footer-text"> Información de contácto:</p>
          <div className="list-items">
          <li className="itemL">
          <i className="fa-brands fa-whatsapp whatsapp"></i>
          </li>
          <li className="itemL">
          <i className="fa-brands fa-instagram instagram"></i>
          </li>
          <li className="itemL">
          <i className="fa-brands fa-facebook facebook"></i>
          </li>
          </div>
        </div>
        <div className="parrafo">
    Henry © 2022 | Todos los derechos reservados.</div>
        <div className="mediosde-pago">
        <p className="footer-text"> Medios de pago:</p>
          <li className="itemL">
          <i className="fa-brands fa-cc-paypal paypal"></i>
          </li>
        </div>
      </div>
      
    </footer>
  );
}
