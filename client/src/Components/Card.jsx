import {NavLink} from "react-router-dom";

const Card = ({e, horizontal}) => {
  const colors = [
       "Black",
        "White",
        "Brown",
        "Purple",
        "Orange",
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Gray",
        "Beige",
        "Pink"
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
      {e.sale !== 0 && <p className="offer-ribbon" offer={e.sale + "%"}></p>}
      <div className="img">
        <img
          src={e.images[0].url ? e.images[0].url : "./Images/logo2.png"}
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
            <p
              title="Price"
              style={
                e.sale ? {textDecoration: "line-through", color: "#999"} : {}
              }
            >
              ${e.price}
            </p>
            &nbsp;
            {e.sale !== 0 && (
              <p title="Offer Price">${e.price - (e.price * e.sale) / 100}</p>
            )}
          </span>
        </div>
        <div className="appear">
          <i className="bi bi-bag" title="Add to cart"></i>
          <NavLink
            to={`/home/${e.id}/${e.model}`}
            style={{color: "black", textDecoration: "none"}}
          >
            <i className="bi bi-toggles2" title="View details"></i>
          </NavLink>
          <i className="bi bi-heart" title="Add to favorites"></i>
        </div>
      </div>
    </div>
  );
};

export default Card;
