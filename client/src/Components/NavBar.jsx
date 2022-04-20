import "../Css/navbar.scss";
import logo from "../Images/logo2.png";
import {useState} from "react";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {sortByGender, resetState} from "../redux/actions/sortBy";
import {resetFilters, genderFilter} from "../redux/actions/leftSideFilter";
import {useDispatch} from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const [search, setSearch] = useState("");
  function abrirYcerrar() {
    setDropDown(!dropDown);
  }
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
  };
  return (
    <div className="navbarOwn">
      <NavLink to={"/"}>
        <img className="logoOwn" src={logo} alt="logo" />
      </NavLink>
      <ul className="sectionsOwn">
        <li onClick={() => {}}>
          <NavLink
            onClick={() => {
              dispatch(resetState());
              dispatch(resetFilters());
              dispatch(genderFilter("All"));
            }}
            to="/home"
          >
            HOME
          </NavLink>
        </li>
        <li
          onClick={() => {
            dispatch(sortByGender("Male"));
            dispatch(resetFilters());
            dispatch(genderFilter("Male"));
            navigate("/home");
          }}
        >
          MEN
        </li>
        <li
          onClick={() => {
            dispatch(sortByGender("Female"));
            dispatch(resetFilters());
            dispatch(genderFilter("Female"));
            navigate("/home");
          }}
        >
          WOMEN
        </li>
        <li
          onClick={() => {
            dispatch(sortByGender("Kids"));
            dispatch(resetFilters());
            dispatch(genderFilter("Kids"));
            navigate("/home");
          }}
        >
          KIDS
        </li>
      </ul>

      <form className="searchOwn" onSubmit={handleSearch}>
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input
          type="text"
          placeholder="SEARCH"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem>Log out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </li>
      </ul>
    </div>
  );
};
export default NavBar;
