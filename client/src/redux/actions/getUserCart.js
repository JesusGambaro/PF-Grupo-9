import axios from "axios"
import { GET_CART } from "./actions"

const URL = "http://localhost:3001/cart"

export const getUserCart = (token) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${URL}`, {
      headers: { Authorization: `bearer ${token}` },
    })
    dispatch({
      type: GET_CART,
      payload: data,
    })
  }
}
