import axios from "axios"
import {GET_PROFILE} from "./actions"
const URL="http://localhost:3001/orders/userOrders"


export const getOrderProfile=(token)=>{
  return async (dispatch)=>{
    const {data}=await axios.get(`${URL}`,{
      headers: {'Authorization':`bearer ${token}`}
    })
    dispatch({
      type:GET_PROFILE,
      payload:data
    })
  }
}

