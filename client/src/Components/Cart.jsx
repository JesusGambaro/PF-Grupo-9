import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCart,
  deleteCartItem,
  deleteAllCart,
  putCart,
  addCart,
  loadingCartBoolean,
} from "../redux/actions/userCart";
import "../Css/AdminProducts.scss";
import "../Css/Cart.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const CardProduct = ({
  id,
  product,
  amount,
  size,
  deleteCartItem,
  handlePut,
}) => {
  const { finalPrice, model, brand, images } = product;
  const maxStock = product.stocks.find((stock) => stock.size === size);
  const max = maxStock.size;
  return (
    <div className="product-card">
      <img src={images[0].url} alt="" />
      <p>${finalPrice}</p>
      <div className="model">
        <p>{model}</p>
        <p>{brand}</p>
      </div>
      <div className="amount">
        <label>
          Amount<span>(max {max})</span>
        </label>
        <input
          type="number"
          defaultValue={amount}
          min={1}
          max={max}
          onClick={(e) => handlePut(e, product.id, size)}
        />
      </div>
      <div className="size">
        <label htmlFor="">Size</label>
        <p>{size}</p>
      </div>
      <div className="actions">
        <button onClick={(e) => deleteCartItem(id)}>
          <i className="bi bi-trash"></i> Delete
        </button>
      </div>
    </div>
  )
}

export default function Cart () {
    const token = window.localStorage.getItem("token")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let {cartUser, loadingCart} = useSelector(state => state.root)
    const {sameUserCartItems, total} = cartUser
    const initLoad = ()=> {
      dispatch(loadingCartBoolean(true))
    }
    useEffect(() => {
      if(!token || (token && !token.length)) {
        dispatch(loadingCartBoolean(true))
        Swal.fire({
        title: 'You must login to see your cart',
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
        return navigate("/home")
      })}
       dispatch(getUserCart(token))
       return initLoad
      },[dispatch,addCart,navigate,token])
    const handlePut = (e,productId,size) => {
      const product = {amount:  e.target.value, productId,size}
      dispatch(putCart(token,product))
      dispatch(getUserCart(token))
    }
    const handleDeleteCartItem = (id) =>{
        Swal.fire({
            text: "Do you want to delete it?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I want',
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCartItem(id,token))
                dispatch(getUserCart(token))
            }
          })
    }
    const deleteAll = () => {
        Swal.fire({
            text: "Do you want to delete all?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I want',
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteAllCart(token))
              dispatch(getUserCart(token))
            }
          })
    }
    const makeOrder = (e) => {
    navigate("/home/cart/order")
    }

    return (
    <div className= "cart-container">
        {loadingCart? <Loading/>: sameUserCartItems.length ?
        <div className="products-section-container" >
            <div className="add-section">
                <h1>Cart</h1>
            </div>
            <div className="products-cards-container">
                {sameUserCartItems && sameUserCartItems.map(cartItem => {return <CardProduct key={cartItem.id} id={cartItem.id} product={cartItem.product} amount={cartItem.amount} size={cartItem.size} handlePut={handlePut} deleteCartItem={handleDeleteCartItem}/>})}
            <div className="cart-actions">
                <button className="trash" onClick={e => deleteAll()}>
                <i class="bi bi-trash"></i> Delete all
                </button>
                <label className="totalprice">Total:${total}</label>
                <button className="purchase" onClick={e => makeOrder(e)}>
                <i class="bi bi-bag-fill"></i> Purchase
                </button>
            </div>
          </div>
        </div>
       : 
        <h1 style={{ marginTop: "50px" }}>Your cart is empty</h1>
      }
    </div>
  );
}
