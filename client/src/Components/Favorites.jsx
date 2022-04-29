import React from "react";
import "../Css/Favorities.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserFav,
  deleteFavItem,
  deleteAllFav,
  addFav,
} from "../redux/actions/userFav";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";

const CardProduct = ({
  id,
  product,
  amount,
  deleteFavItem,
  handlePut,
  token,
}) => {
  const dispatch = useDispatch();
  const { finalPrice, model, brand, images } = product;
  return (
    <div className="favorite-card">
      <div className="img">
        {" "}
        <NavLink to={`/home/${product.id}/${product.model}`}>
          <img src={images[0].url} alt="" />
        </NavLink>
      </div>
      <div className="textContainer">
        <p>${finalPrice}</p>
        <p>{model}</p>
        <p>{brand}</p>
      </div>
      <div className="actions">
        <div className="cart_detail">
          <button className="addToCartButton">
            <i
              className="bi bi-bag"
              title="Add to cart"
              //onClick={() => handleAddProduct(e, "cart")}
            >
              &nbsp;
            </i>
            <p>Add to cart</p>
          </button>
          <NavLink
            to={`/home/${product.id}/${product.model}`}
            style={{ color: "black", textDecoration: "none" }}
          >
            <i className="bi bi-toggles2" title="View details"></i>
            <p>View Details</p>
          </NavLink>
        </div>

        <button className="deleteButton" onClick={(e) => deleteFavItem(id)}>
          <i className="bi bi-trash"></i> <p>Delete</p>
        </button>
      </div>
    </div>
  );
};
const Favorites = () => {
  const token = window.localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favUser = useSelector((state) => state.root.favUser);
  //console.log(favUser);
  useEffect(() => {
    if (!token || (token && !token.length)) {
      //dispatch(loadingCartBoolean(true))
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
          return navigate("/home/login");
        }
        return navigate("/home");
      });
    }
    dispatch(getUserFav(token));
    //return prueba
  }, [dispatch, addFav, navigate, token]);
  const handleDeleteFavtItem = (id) => {
    Swal.fire({
      text: "Do you want to delete it?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFavItem(id, token));
      }
    });
  };
  return (
    <div className="favorites">
      {favUser.length ? (
        <>
          <h1>Favorites</h1>
          <div className="favoritesContainer">
            {favUser.length &&
              favUser.map((cartItem, i) => {
                //<Card e={e} key={i} horizontal={true}/>
                return (
                  <CardProduct
                    key={cartItem.id}
                    token={token}
                    id={cartItem.id}
                    product={cartItem.product}
                    amount={cartItem.amount}
                    size={cartItem.size}
                    deleteFavItem={handleDeleteFavtItem}
                  />
                );
              })}
          </div>
          <div className="fav-buttons">
            <button className="deleteAll-button">
              <i className="bi bi-trash"></i> Delete all
            </button>
          </div>
        </>
      ) : (
        <div className="noFavoriteItems">
          <h1>There are no favorite items</h1>
          <NavLink
            to={`/home`}
            style={{ color: "black"}}
          >
            <p>Click here to add more</p>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Favorites;
