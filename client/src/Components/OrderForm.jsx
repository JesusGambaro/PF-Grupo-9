import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCart, getUserCart } from "../redux/actions/userCart"
import "../Css/OrderForm.css"
import { useNavigate } from "react-router-dom"
import { postOrder } from "../redux/actions/order"
import Swal from "sweetalert2"
export default function OrderForm () {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = window.localStorage.getItem("token")
    const cart = useSelector(state => state.root.cartUser)
    const [order, setOrder] = useState({
    telephoneNumber:"",
    address:"",
    })
    const [error, setError] = useState({})
    useEffect(() => {
        dispatch(getUserCart(token))
        if(!cart || !cart.length) navigate("/home")
    },[dispatch,token,navigate,addCart])
    const totalPrice = () => {
        let total = 0
        cart.forEach((item) => {
            total += item.product.finalPrice
        })
        return total
    }
    const totalFootwear = () => {
        let total = 0
        cart.forEach((item) =>{ 
            total += item.amount
        })
        return total
    }
    const handleOnChangeForm = (e) => {
        handleErrorForm(e)
        setOrder({...order,[e.target.name]: e.target.value})
    }
    const handleErrorForm = (e) => {
        if(e.target.name === "telephoneNumber"){
            if(!e.target.value.length) return setError({...error,telephoneNumber: "Telephone number is required"})
            if(e.target.value.length > 15 || e.target.value.length < 4) return setError({...error,telephoneNumber: "Invalid telephone number"})
        }
        if(e.target.name === "address"){
            if(!e.target.value.length) return setError({...error,address: "Address is required"})
            if(e.target.value.length > 100) return setError({...error,address: "Invalid address"})
        }
        setError({}) 
    }
    const validation = () =>{
        if(!order.address.length || !order.telephoneNumber.length) return true
        return Object.keys(error).length
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postOrder(token,order))
        Swal.fire({
            icon: 'success',
            title: 'The order has been placed',
            showConfirmButton: false,
            timer: 1250,
          }).then( () => {
            navigate("/home/profile")
          })
          
    }
    return (
        <div >
            { cart &&
             <section className="order-container">
                <h1 className="fw-bold text-center mb-3">Purchase</h1>
                <form onSubmit={(e) => handleSubmit(e)} className="form">
                    <label className="input-number" ><span>Telephone number<i className="asterisco">*</i></span><input placeholder="3447423612" type="number" name="telephoneNumber" value={order.telephoneNumber} onChange={e => handleOnChangeForm(e)}/></label>
                    {error.telephoneNumber && <label className="col form-label text-danger fw-bold text-end">{error.telephoneNumber}</label>}
                    <label><span>Address<i className="asterisco">*</i></span><input name="address" placeholder="San Martin 35" value={order.address} onChange={e => handleOnChangeForm(e)}/></label>
                    {error.address && <label className="col form-label text-danger fw-bold text-end">{error.address}</label>}
                    <div className="totals">
                        <span>Total footwears: {totalFootwear()}</span>
                        <span>Order total: ${totalPrice()}</span>
                    </div>
                    <button className="submit-button" disabled={validation()}><i class="bi bi-bag-fill"></i>Place the order!</button>
                </form>
            </section>}
        </div>
    )
}