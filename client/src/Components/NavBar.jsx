import "../Css/navbar.scss";
import logo from "../Images/logo2.png";
import {useEffect, useState} from "react";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {sortByGender, resetState} from "../redux/actions/sortBy";
import {
  resetFilters,
  genderFilter,
  leftSideFilter,
} from "../redux/actions/leftSideFilter";
import {roleUser} from "../redux/actions/Loginregister";
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";
import {getUserFav} from "../redux/actions/userFav";
const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const [logueado, setLogueado] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [profileName, setProfileName] = useState("Profile");
  const {role} = useSelector((store) => store.root);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    /*    if (!window.localStorage.getItem("token")) {
      navigate("/home/login");
    } else { */
    if (role.admin) setProfileName("Dashboard");
    else if (role.admin === undefined && token) dispatch(roleUser(token));
    else setProfileName("Profile");
  }, [dispatch, navigate, role.admin, token]);

  function abrirYcerrar() {
    setDropDown(!dropDown);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/home");
    dispatch(leftSideFilter("nameBrand", searchParam));
  };

  const handleRegister = () => {
    window.localStorage.removeItem("token");
    setLogueado(false);
    navigate("/");
  };

  const handleCart = () => {
    if (logueado) return navigate("/home/cart");
    Swal.fire({
      title: "You must login to see your cart",
      text: "Do you want to login?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/home/login");
      }
    });
  };
  const handleFav = () => {
    if (logueado) return navigate("/home/favorites");
    Swal.fire({
      title: "You must login to see your favorites",
      text: "Do you want to login?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/home/login");
      }
    });
  };

  useEffect(() => {
    if (token) {
      setLogueado(true);
    } else {
      setLogueado(false);
    }
  }, [logueado, token]);

  return (
    <div className="navbarOwn">
      <NavLink to={"/"}>
        <img className="logoOwn" src={logo} alt="logo" />
      </NavLink>
      <ul className="sectionsOwn">
        <li onClick={() => {}}>
          <NavLink
            onClick={() => {
              if (token) dispatch(getUserFav(token));
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
            if (token) dispatch(getUserFav(token));
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
            if (token) dispatch(getUserFav(token));
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
            if (token) dispatch(getUserFav(token));
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
          <i onClick={handleFav} className="bi bi-heart"></i>
        </li>
        <li>
          <i onClick={handleCart} className="bi bi-bag"></i>
        </li>
        <li>
          {logueado ? (
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
          ) : (
            <NavLink
              to="/home/login"
              className="text-dark"
              style={{textDecoration: "none"}}
            >
              LogIn
            </NavLink>
          )}
        </li>
      </ul>
    </div>
  );
};
export default NavBar;
