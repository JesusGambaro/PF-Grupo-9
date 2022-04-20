
import "../Css/AdminNav.css";
import logo from "../Images/logo2.png";
import {useState} from "react";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {sortByGender, resetState} from "../redux/actions/sortBy";
import {useDispatch} from "react-redux";

const AdminNav = ({section}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  function abrirYcerrar() {
    setDropDown(!dropDown);
  }
  return (
    <div className="admin-navbar">
      <NavLink to={"/"}>
        <img className="logo-admin" src={logo} alt="logo" />
      </NavLink>
    <h1 className='admin-title'>{section}</h1>
    
    <div className="icons-nav-admin">
        <li onClick={() => dispatch(resetState())} >
          <NavLink to="/home" className="goHome-admin">HOME</NavLink>
        </li>
        
        <li>
        <i class="bi bi-bell bell-admin"></i>
        </li>
        <li>
          <Dropdown isOpen={dropDown} toggle={abrirYcerrar}>
            <DropdownToggle  caret className="admin-drop">
              <i className="bi bi-person person-admin" width='40px'></i>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem>Log out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </li>
      </div>
      {/* <form className="searchOwn">
        <button type="submitOwn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input type="text" placeholder="SEARCH" />
      </form> */}
      
        
    </div>
  );
};
export default AdminNav;