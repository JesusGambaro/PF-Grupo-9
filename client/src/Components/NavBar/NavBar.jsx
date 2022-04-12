import './NavBar.css'
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';





export default function NavBar(){
    const [dropDown, setDropDown]=useState(false)
    function abrirYcerrar(){
        setDropDown(!dropDown)
    }

    return(
        <div >
            {/* <h1 className='textNav title'>Shoes</h1> */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light navBarProp">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
      {/*   <li className="nav-item dropdown">
          <button type='button' className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </button>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="https://www.jw.org/es/">Action</a></li>
            <li><a className="dropdown-item" href="https://www.jw.org/es/">Another action</a></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><a className="dropdown-item" href="https://www.jw.org/es/">Something else here</a></li>
          </ul>
        </li> */}
        <li className="nav-item dropdown" >
            <Dropdown isOpen={dropDown} toggle={abrirYcerrar} >
                <DropdownToggle caret className='drop'>
                    User
                </DropdownToggle>
                <DropdownMenu >
                    <DropdownItem>primero</DropdownItem>
                    <DropdownItem>segundo</DropdownItem>
                    <DropdownItem>tercero</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </li>
    
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
        </div>
    )
}