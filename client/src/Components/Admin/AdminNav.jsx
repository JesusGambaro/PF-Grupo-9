import "../../Css/AdminNav.css";
import logo from "../../Images/logo2.png";
import {useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

import { NavLink, useNavigate } from "react-router-dom";
import { sortByGender, resetState } from "../../redux/actions/sortBy";
import { useDispatch,useSelector } from "react-redux";
import {roleUser} from "../../redux/actions/Loginregister";
const AdminNav = ({ section }) => {
  const [profileName, setProfileName] = useState("Profile");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const {role} = useSelector((store) => store.root);
  const token = window.localStorage.getItem("token");
  function abrirYcerrar() {
    setDropDown(!dropDown);
  }
  const handleRegister = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };
  useEffect(() => {
    /*    if (!window.localStorage.getItem("token")) {
         navigate("/home/login");
       } else { */
         if (role.admin) setProfileName("Dashboard");
         else if (role.admin === undefined) dispatch(roleUser(token));
         else setProfileName("Profile");
       
     }, [dispatch, navigate, role.admin, token]);
  return (
    <div className="admin-navbar">
      <NavLink to={"/"}>
        <img className="logo-admin" src={logo} alt="logo" />
      </NavLink>
      <h1 className="admin-title">{section}</h1>

      <div className="icons-nav-admin">
        <li onClick={() => dispatch(resetState())}>
          <NavLink to="/home" className="goHome-admin">
            HOME
          </NavLink>
        </li>

       
        <li>
          <Dropdown isOpen={dropDown} toggle={abrirYcerrar}>
            <DropdownToggle className="drop">
              <i className="bi bi-person"></i>
            </DropdownToggle>
            <DropdownMenu title="My count">
              <DropdownItem onClick={() => navigate("/home/profile")}>
                {profileName}
              </DropdownItem>
              <DropdownItem onClick={handleRegister}>Log out</DropdownItem>
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
