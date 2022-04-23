import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserCart } from "../redux/actions/getUserCart"

const CardProduct = ({ shoe }) => {
  const dispatch = useDispatch()
  const DeleteItem = async (id) => {
    dispatch(id)
  }
  return (
    <div className="product-card">
      <img src={shoe.images[0].url} alt="" />
      <p>$ {shoe.price}</p>
      <p>Status</p>
      <p>{shoe.createdAt.substring(0, shoe.createdAt.indexOf("T"))}</p>
      <div className="actions">
        <button>
          <i class="bi bi-pen"></i>Edit
        </button>
        <button
          onClick={() => {
            DeleteItem(shoe.id)
          }}
        >
          <i class="bi bi-trash"></i> Delete
        </button>
      </div>
    </div>
  )
}

export default function Cart () {
    const token = window.localStorage.getItem("token")
    const dispatch = useDispatch()
    const cartUser = useSelector(state => state.cartUser)
    useEffect(() => {
        dispatch(getUserCart(token))
    },[dispatch,token])
    return (
    <div>
     <title>Cart</title>
     {}
    </div>
    )
}