import '../../Css/ClosedSideBarAdmin.css'
import React from "react"; 
import { useState } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { Link, useLocation} from "react-router-dom";
/* import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Container from 'react-bootstrap/Container'
import SideBarAdmin from "./SideBarAdmin";
import  icono from'../Images/shoe icon.png' */


export default function OpenSideBarAdmin() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const location=useLocation()

    const {pathname}=location
    const splitLocation = pathname.split("/");
   

    const renderTooltip = (item) => (
      <Tooltip id="button-tooltip" >
        {item}
      </Tooltip>)
  
    return (
      
    <div className='container-admin '>
      
    <ul className="nav flex-column icons-container-admin"> 
     {/* <Button variant="primary" className='boton-a' onClick={handleShow} >
    <i className="bi bi-list"></i>
      </Button>

      <Offcanvas show={show} onHide={handleClose} >
        <Offcanvas.Body>
         <SideBarAdmin handleClose={handleClose}/> 
        </Offcanvas.Body>
      </Offcanvas> */} 
      <OverlayTrigger
    placement="right"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltip('Dashboard')}
  >
   <li className="nav-item itemL itemL-admin">
    <Link to='/home/admin/dashboard' className={splitLocation[3] === "dashboard" ?'nav-link nLink': 'nav-link '}> <i className="bi bi-clipboard-data data" ></i></Link>
  </li>
  </OverlayTrigger>

  <OverlayTrigger
    placement="right"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltip('Purchases and orders')}
  >
  <li className="nav-item itemL itemL-admin">
    <Link to='/home/admin/orders' className={splitLocation[3] === "orders" || splitLocation[3] === "order" ?'nav-link nLink': 'nav-link '} ><i className="bi bi-currency-dollar dollar" onClick={handleShow}></i></Link>
  </li>
  </OverlayTrigger>
  <OverlayTrigger
    placement="right"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltip('Products')}
  >
  <li className="nav-item itemL itemL-admin">
    <Link to='/home/admin/products' className={splitLocation[3] === "products" ?'nav-link nLink': 'nav-link '}><i className="bi bi-bag bag"></i></Link>
  </li>
  </OverlayTrigger>
  <OverlayTrigger
    placement="right"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltip('Customers')}
  >
  <li className="nav-item itemL itemL-admin">
    <Link to='/home/admin/customers' className={splitLocation[3] === "customers" ?'nav-link nLink': 'nav-link '} href="customers"><i className="bi bi-person account"></i></Link>
    </li> 
    </OverlayTrigger>
  
</ul> 
        
        
        
        </div>
    );
  }