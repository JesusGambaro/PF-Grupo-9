import "../Css/navbar.scss";
import '../Css/NavBar.css'
import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Link } from "react-router-dom";



const NavBar = () => {
  const [dropDown, setDropDown]=useState(false)
    function abrirYcerrar(){
        setDropDown(!dropDown)
    }
  return (
    <div className="navbarOwn">
      <img className="logoOwn" src="./Images/logo2.png" alt="logo" />
      
      <ul className="sectionsOwn">
        <li><Link to='/home' className="gohome">HOME</Link></li>
        <li>MEN</li>
        <li>WOMEN</li>
        <li>KIDS</li>
      </ul>
      <form className="searchOwn">
        <button type="submitOwn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input type="text" placeholder="SEARCH" />
      </form>
      <ul className="shortcutOwn">
        <li>
          <i className="bi bi-heart"></i>
        </li>
        <li>
          <i className="bi bi-bag"></i>
        </li>
        <li>
          
          <Dropdown isOpen={dropDown} toggle={abrirYcerrar} >
                <DropdownToggle className='drop'>
                <i className="bi bi-person"></i>
                </DropdownToggle>
                <DropdownMenu >
                    
                    <DropdownItem>cerrar sesión</DropdownItem>
                    <DropdownItem>información</DropdownItem>
                </DropdownMenu>
            </Dropdown>
          
        </li>
      </ul>
    </div>
  );
};
export default NavBar;
