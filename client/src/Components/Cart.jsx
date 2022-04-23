import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserCart, deleteCartItem, deleteAllCart} from "../redux/actions/getUserCart"
import "../Css/AdminProducts.scss";
import Swal from "sweetalert2";

const CardProduct = ({id, product, amount, size, deleteCartItem, }) => {
const { finalPrice, model, brand, images } = product
  return (
    <div className="product-card">
      <img src={images[0].url} alt="" />
      <p>${finalPrice}</p>
      <p>{model}</p>
      <p>{brand}</p>
      <p>{amount}</p>
      <p>{size}</p>
      <div className="actions">
        <button onClick={e => deleteCartItem(id)}>
          <i class="bi bi-trash"></i> Delete
        </button>
      </div>
    </div>
  )
}

export default function Cart () {
    const token = window.localStorage.getItem("token")
    const dispatch = useDispatch()
    const cartUser = useSelector(state => state.root.cartUser)
    useEffect(() => {
        dispatch(getUserCart(token))
    },[dispatch,token])
    const handleDeleteCartItem = (id) =>{
        Swal.fire({
            text: "Do you want to delete all?",
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
    return (
    <div>
        <div className="products-section-container">
            <div className="add-section">
            <h1>Cart</h1>
            </div>
            <div className="products-cards-container">
            {cartUser && cartUser.map(cartItem => {return <CardProduct key={cartItem.id} id={cartItem.id} product={cartItem.product} amount={cartItem.amount} size={cartItem.size} deleteCartItem={handleDeleteCartItem}/>})}
            </div>
        <button onClick={e => deleteAll()}>
          <i class="bi bi-trash"></i> Delete all
        </button>
        </div>
    </div>
    )
}