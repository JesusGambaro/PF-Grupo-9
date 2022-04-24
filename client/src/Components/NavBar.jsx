import "../Css/navbar.scss";
import logo from "../Images/logo2.png";
import { useEffect, useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { sortByGender, resetState } from "../redux/actions/sortBy";
import { resetFilters, genderFilter,leftSideFilter } from "../redux/actions/leftSideFilter";
import { useDispatch } from "react-redux";
import search from "../redux/actions/search";
import Swal from "sweetalert2";
const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const [logueado, setLogueado] = useState(false)
  const [searchParam, setSearchParam] = useState("");
  function abrirYcerrar() {
    setDropDown(!dropDown);
  }
  const token=window.localStorage.getItem("token")
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search param:",searchParam);
    dispatch(leftSideFilter("nameBrand",searchParam));
  };

  const handleRegister = () => {
    window.localStorage.removeItem("token")
    setLogueado(false)
    navigate("/")
  }

  const handleCart = () => {
    if(logueado) return navigate("/home/cart")
    Swal.fire({
      title: 'You must login to see your cart',
      text: "Do you want to login?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I want',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/home/login")
      }
    })
  }

  useEffect(() => {
    if (token) {
      setLogueado(true)
    }
    else {
      setLogueado(false)
    }
  }, [logueado,token])

  return (
    <div className="navbarOwn">
      <NavLink to={"/"}>
        <img className="logoOwn" src={logo} alt="logo" />
      </NavLink>
      <ul className="sectionsOwn">
        <li onClick={() => { }}>
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

      <form
        className="searchOwn"
        onSubmit={handleSearch}
        onClick={() => {
          //dispatch(resetState());
          //dispatch(resetFilters());
          navigate("/home");
        }}
      >
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input
          type="text"
          placeholder="SEARCH"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
        />
      </form>

      <ul className="shortcutOwn">
        <li>
          <i className="bi bi-heart"></i>
        </li>
        <li>
          <i onClick={handleCart} className="bi bi-bag"></i>
        </li>
        <li>
          {logueado
            ? (<Dropdown isOpen={dropDown} toggle={abrirYcerrar}>
              <DropdownToggle className="drop">
                <i className="bi bi-person"></i>
              </DropdownToggle>
              <DropdownMenu title="My count">
                <DropdownItem onClick={()=>navigate("/home/profile")}>Profile</DropdownItem>
                <DropdownItem onClick={handleRegister}>Log out</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            )
            : <NavLink to="/home/login" className="text-dark">
              LogIn
            </NavLink>
          }
        </li>
      </ul>
    </div>
  );
};
export default NavBar;
