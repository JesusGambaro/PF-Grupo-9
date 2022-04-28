import axios from "axios"
import { POST_ORDER } from "./actions"

const URL = "http://localhost:3001/orders"

export const postOrder = (token, order) => {
   return async (dispatch) => {
    const data = await axios.post(`${URL}`, order, {
      headers: { "Authorization": `Bearer ${token}`},
    })

    dispatch({type: POST_ORDER, payload: data.data})
  }
}
