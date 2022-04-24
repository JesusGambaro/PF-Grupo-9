import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserCart, deleteCartItem, deleteAllCart, putCart} from "../redux/actions/getUserCart"
import "../Css/AdminProducts.scss";
import Swal from "sweetalert2";

const CardProduct = ({id, product, amount, size, deleteCartItem,handlePut,maxStock }) => {
const { finalPrice, model, brand, images } = product
  return (
    <div className="product-card">
      <img src={images[0].url} alt="" />
      <p>${finalPrice}</p>
      <p>{model}</p>
      <p>{brand}</p>
      <label htmlFor="">Amount:<p> <button name="minus" onClick={e => handlePut(e)}><i disabled={true} onClick={false} class="bi bi-arrow-down-circle-fill"></i></button>{amount}<button onClick={e=> handlePut(e)} name="plus"><i class="bi bi-arrow-up-circle-fill"></i></button></p></label>
      <label htmlFor="">Size:<p>{size}</p></label>
      <label htmlFor="">Máx:{maxStock}</label>
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
    const [order,setOrder] = useState({

    })
    useEffect(() => {
        dispatch(getUserCart(token))
    },[dispatch,token])
    const handlePut = (e) => {
        console.log(e.target.name)
        const product = {}
        // dispatch(putCart(token,product))
        // dispatch(getUserCart(token))
    }
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
    const makeOrder = (e) => {
    e.preventDefault()

    }
    const totalPrice = () => {
        let total = 0
        cartUser.forEach((item) => {
            total += item.product.finalPrice
        })
        return total
    }
    return (
    <div style={{width:"70%",display:"flex",justifyContent:"center",boxSizing:"content-box",marginTop:"50px"}}>
        {cartUser.length?
        <div className="products-section-container" >
            <div className="add-section">
                <h1>Cart</h1>
            </div>
            <div className="products-cards-container">
                {cartUser && cartUser.map(cartItem => {return <CardProduct key={cartItem.id} id={cartItem.id} product={cartItem.product} amount={cartItem.amount} size={cartItem.size} handlePut={handlePut} deleteCartItem={handleDeleteCartItem}/>})}
            <div className="actions">
                <button onClick={e => deleteAll()}>
                <i class="bi bi-trash"></i> Delete all
                </button>
                <label>Total:{totalPrice()}</label>
            </div>
            </div>
            <form action="">
                <label htmlFor="" className="form-label"> Telephone number
                <input type="number" className="form-input" />
                </label>
                <label htmlFor="" className="form-label"> Adress
                <input type="text" className="form-input" />
                </label>
                <button type="onSubmit" onClick={e => makeOrder(e)}>
                <i class="bi bi-bag-fill"></i> Purchase
                </button>
            </form>
        </div> : <h1>Your cart is empty</h1>}
    </div>
    )
}

