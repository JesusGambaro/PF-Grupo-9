import "../Css/navbar.scss";

const NavBar = () => {
  return (
    <div className="navbarOwn">
      <img className="logoOwn" src="./Images/logo2.png" alt="logo" />
      <ul className="sectionsOwn">
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
          <i className="bi bi-person"></i>
        </li>
      </ul>
    </div>
  );
};
export default NavBar;
