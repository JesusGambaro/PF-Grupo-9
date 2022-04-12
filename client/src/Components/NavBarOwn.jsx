import "../Css/navbar.scss";

const NavBarOwn = () => {
  return (
    <div className="navbar">
      <img className="logo" src="./Images/logo2.png" alt="logo" />
      <ul className="sections">
        <li>MEN</li>
        <li>WOMEN</li>
        <li>KIDS</li>
      </ul>
      <form className="search">
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input type="text" placeholder="SEARCH" />
      </form>
      <ul className="shortcut">
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
export default NavBarOwn;
