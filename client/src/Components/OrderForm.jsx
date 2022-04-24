import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserCart } from "../redux/actions/getUserCart"

export default function OrderForm () {
    const dispatch = useDispatch()
    const token = window.localStorage.getItem("token")
    const cart = useSelector(state => state.root.cartUser)
    const [order, setOrder] = useState({
    telephoneNumber:"",
    adress:"",
    })

    useEffect(() => {
        dispatch(getUserCart(token))
    },[dispatch,token])
    const totalPrice = () => {
        let total = 0
        cart.forEach((item) => {
            total += item.product.finalPrice
        })
        return total
    }
    return (
        <div style={{width:"70%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",marginTop:"60px"}}>
            <h1>Purchase</h1>
            <form action="" style={{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"flex-start"}}>
                <label htmlFor="">Telephone number<input type="text" /></label>
                <label htmlFor="">Adress<input /></label>
                <button type="submit">Buy it!</button>
            </form>
            <p>TOTAL: ${totalPrice()}</p>
        </div>
    )
}