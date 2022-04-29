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
import { addCart } from "../redux/actions/userCart";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";

const CardProduct = ({ id, product, deleteFavItem, addCartItem }) => {
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
          <button
            className="addToCartButton"
            onClick={() => addCartItem(product)}
          >
            <i className="bi bi-bag" title="Add to cart">
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

        <button className="deleteButton" onClick={(e) => deleteFavItem(id,"oneItem")}>
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
  const handleDeleteFav = (id, type) => {
    Swal.fire({
      text: type === "oneItem"
      ? "Do you want to delete it?"
      : "Do you want to delete all items?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want",
    }).then((result) => {
      if (result.isConfirmed) {
        type === "oneItem"
          ? dispatch(deleteFavItem(id, token))
          : dispatch(deleteAllFav(token));
      }
    });
  };
  const handleAddCart = (e) => {
    const sizes = {};
    e.stocks.forEach((element) => {
      sizes[element.size] = element.size;
    });
    if (token) {
      console.log("addCartFav");
      Swal.fire({
        title: "Select a size",
        input: "select",
        inputOptions: sizes,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Add",
      }).then((result) => {
        if (result.isConfirmed) {
          const product = { productId: e.id, size: result.value };
          dispatch(addCart(token, product));
          Swal.fire({
            position: "bottom-end",
            icon: "success",
            title: "Product added successfully",
            showConfirmButton: false,
            timer: 1250,
          });
        }
      });
    }
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
                    deleteFavItem={handleDeleteFav}
                    addCartItem={handleAddCart}
                  />
                );
              })}
          </div>
          <div className="fav-buttons">
            <button className="deleteAll-button" onClick={() => handleDeleteFav(0,"all")}>
              <i className="bi bi-trash"></i> Delete all
            </button>
          </div>
        </>
      ) : (
        <div className="noFavoriteItems">
          <h1>There are no favorite items</h1>
          <NavLink to={`/home`} style={{ color: "black" }}>
            <h6>Click here to add more</h6>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Favorites;
