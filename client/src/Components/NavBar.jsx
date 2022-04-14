import "../Css/navbar.scss";
import logo from "../Images/logo2.png";
import {useState} from "react";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {sortByGender} from "../Redux/actions/sortBy";
import {useDispatch} from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  function abrirYcerrar() {
    setDropDown(!dropDown);
  }
  return (
    <div className="navbarOwn">
      <NavLink to={"/"}>
        <img className="logoOwn" src={logo} alt="logo" />
      </NavLink>
      <ul className="sectionsOwn">
        <li>
          <NavLink to="/home">HOME</NavLink>
        </li>
        <li
          onClick={() => {
            dispatch(sortByGender("men"));
            navigate("/home");
          }}
        >
          MEN
        </li>
        <li
          onClick={() => {
            dispatch(sortByGender("women"));
            navigate("/home");
          }}
        >
          WOMEN
        </li>
        <li
          onClick={() => {
            dispatch(sortByGender("kids"));
            navigate("/home");
          }}
        >
          KIDS
        </li>
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
          <Dropdown isOpen={dropDown} toggle={abrirYcerrar}>
            <DropdownToggle className="drop">
              <i className="bi bi-person"></i>
            </DropdownToggle>
            <DropdownMenu>
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
