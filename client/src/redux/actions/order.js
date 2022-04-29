import axios from "axios"
import { CLEAN_ORDER, POST_ORDER } from "./actions"

const URL = "http://localhost:3001/orders"

export const postOrder = (token, order) => {
  
   return async (dispatch) => {
     await dispatch( {
      type: CLEAN_ORDER
    }) 
     console.log('despachando') 
    const data = await axios.post(`${URL}`, order, {
      headers: { "Authorization": `bearer ${token}`},
    })
console.log(data.data.error)

  dispatch({type: POST_ORDER, payload: data.data/* data.data.error? data.data.error:data.data.msg */})
   
  }
}

/* export const cleanOrder=()=>{
  return{
    type: CLEAN_ORDER
  }
} */