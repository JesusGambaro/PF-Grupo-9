import '../Css/SideBarAdmin.css'
import logo from "../Images/logo2.png";
import React from "react"; 
import { useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Container from 'react-bootstrap/Container'


export default function SideBarAdmin({handleClose}) {
    /* const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); */ 
  
    return (
      <>
     {/*  <Navbar bg="" expand={false} > */}
  
   <div >
   <Offcanvas.Header >
          <Offcanvas.Title><img className="logoOwn-admin" src={logo} alt="logo" />Henry Shoes</Offcanvas.Title>
          <Button variant="primary" className='boton-c' onClick={handleClose} >
    <i className="bi bi-caret-left"></i>
      </Button>
        </Offcanvas.Header>
   
   <ul className="nav flex-column icons-container-admin" onClick={handleClose}>
   <li className="nav-item itemL itemL-admin">
    <a className="nav-link " href="#"> <i className="bi bi-clipboard-data data" ></i></a>
    <p className='option-text-admin' >Dashboard</p>
  </li>
  <li className="nav-item itemL itemL-admin" onClick={handleClose}>
    <a className="nav-link" href="purchases and orders"><i className="bi bi-currency-dollar dollar" ></i></a>
    <p className='option-text-admin'>purchases and orders</p>
  </li>
  <li className="nav-item itemL itemL-admin" onClick={handleClose}>
    <a className="nav-link" href="#"><i className="bi bi-bag bag"></i></a>
    <p className='option-text-admin'>Products</p>
  </li>
  <li className="nav-item itemL itemL-admin" onClick={handleClose}>
    <a className="nav-link" href="#"><i className="bi bi-person account"></i></a>
    <p className='option-text-admin'>Customers</p>
  </li>
  
</ul>
       
  
    
    </div>
{/* </Navbar> */}
       
      </>
    );
  }