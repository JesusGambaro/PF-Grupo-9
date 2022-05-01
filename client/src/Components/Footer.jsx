import React from "react";
import "../Css/Footer.css";
import logo from "../Images/logo2.png";

export default function Footer() {
  return (
    <footer className="footer-container">
      <img className="logoOwn" src={logo} alt="logo" />
      <div className="footer">
        

        <div className="icons-container-footer">
         <p className="footer-text"> Find us on</p>
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
    Henry © 2022 | All rights reserved.</div>
        <div className="mediosde-pago">
        <p className="footer-text">Payment Methods</p>
        <ol className="payments-icon">
          <li className="itemIcon">
          <img src={require("../Images/Visa.jpg")} alt="Logo Visa" className="mercado-pago"></img>
          </li>
          <li className="itemIcon">
          <img src="https://brandemia.org/sites/default/files/inline/images/american_express_logo_wordmark_detail.png" alt="Logo American express" className="mercado-pago"></img>
          </li>
          <li className="itemIcon">
          <img src="https://e7.pngegg.com/pngimages/728/671/png-clipart-logo-mastercard-font-gif-mastercard.png" alt="Logo mastecard" className="mercado-pago"></img>
          </li>
        </ol>
        </div>
      </div>
      
    </footer>
  );
}
