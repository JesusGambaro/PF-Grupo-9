import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserCart } from "../redux/actions/userCart"
import "../Css/OrderForm.css"
import { useNavigate } from "react-router-dom"
import { postOrder } from "../redux/actions/order"
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
        if(!cart.length) navigate("/home")
    },[dispatch,token,cart.length,navigate])
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
            if(e.target.value.length > 15) return setError({...error,telephoneNumber: "Invalid telephone number"})
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
    }
    return (
        <div style={{width:"70%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",marginTop:"60px"}}>
            <h1>Purchase</h1>
            <form onSubmit={(e) => handleSubmit(e)} style={{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"flex-start"}}>
                <label htmlFor="">Telephone number<mark>*</mark> <input type="number" name="telephoneNumber" value={order.telephoneNumber} onChange={e => handleOnChangeForm(e)}/></label>
                {error.telephoneNumber && <label>{error.telephoneNumber}</label>}
                <label htmlFor="">Address<mark>*</mark><input name="address" value={order.address} onChange={e => handleOnChangeForm(e)}/></label>
                {error.address && <label>{error.address}</label>}
                <button disabled={validation()}>Place the order!</button>
            </form>
            <p>Total footwears:{totalFootwear()}</p>
            <p>TOTAL: ${totalPrice()}</p>
        </div>
    )
}