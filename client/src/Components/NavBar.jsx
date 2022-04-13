import "../Css/navbar.scss";
import logo from "../Images/logo2.png"
const NavBar = () => {
  return (
    <div className="navbarOwn">
      <img className="logoOwn" src={logo} alt="logo" />
      <ul className="sectionsOwn">
        <li className="liOwn">MEN</li>
        <li className="liOwn">WOMEN</li>
        <li className="liOwn">KIDS</li>
      </ul>
      <form className="searchOwn">
        <button type="submitOwn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input type="text" placeholder="SEARCH" />
      </form>
      <ul className="shortcutOwn">
        <li className="liOwn">
          <i className="bi bi-heart"></i>
        </li>
        <li className="liOwn">
          <i className="bi bi-bag"></i>
        </li>
        <li className="liOwn">
          <i className="bi bi-person"></i>
        </li>
      </ul>
    </div>
  );
};
export default NavBar;
