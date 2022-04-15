import {NavLink} from "react-router-dom";

const Card = ({e, horizontal}) => {
  const colors = [
    "rgba(3, 169, 244, 0.7)",
    "rgba(244, 67, 54, 0.7)",
    "rgba(233, 30, 99, 0.7)",
    "rgba(156, 39, 176, 0.7)",
    "rgba(63, 81, 181, 0.7)",
    "rgba(0, 188, 212, 0.7)",
    "rgba(0, 150, 136, 0.7)",
    "rgba(76, 175, 80, 0.7)",
    "rgba(205, 220, 57, 0.7)",
    "rgba(255, 235, 59, 0.7)",
    "rgba(255, 152, 0, 0.7)",
    "rgba(121, 85, 72, 0.7)",
    "rgba(96, 125, 139, 0.7)",
    "rgba(158, 158, 158, 0.7)",
  ];
  /*   const colors = [
    "RGB(239, 145, 155)",
    "RGB(248, 179, 146)",
    "RGB(246, 247, 176)",
    "RGB(160, 207, 162)",
    "RGB(113, 190, 231)",
    "RGB(131, 128, 179)",
  ]; */

  return (
    <div
      className={"cardOwn" + (horizontal ? " h" : "")}
      style={{"--i": colors[Math.floor(Math.random() * colors.length)]}}
    >
      <div className="img">
        <img
          src={
            e.images[0].url?e.images[0].url :"./Images/logo2.png"
          }
          alt={e.model}
        />
      </div>
      <div className="content">
        <div className="f-section">
          <NavLink
            to={`/home/${e.id}/${e.model}`}
            style={{color: "black", textDecoration: "none"}}
          >
            <p title="Name">{e.brand}</p>
          </NavLink>
          <span>
            <div className="rating" title="Rating">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-half"></i>
              <i className="bi bi-star"></i>
            </div>
            <p title="Price">${e.price}</p>
          </span>
        </div>
        <div className="appear">
          <i className="bi bi-bag" title="Add to cart"></i>
          <i className="bi bi-toggles2" title="View details"></i>
          <i className="bi bi-heart" title="Add to favorites"></i>
        </div>
      </div>
    </div>
  );
};

export default Card;
