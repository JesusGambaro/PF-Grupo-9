import axios from "axios"
import { GET_ALL_SALES, LOADING } from "./actions"
const URL = "http://localhost:3001/allFootwear/sales"

const getAllSales = () => {
  return async (dispatch) => {
    dispatch({ type: LOADING, payload: true })
    const { data } = await axios.get(URL)
    dispatch({ type: GET_ALL_SALES, payload: data })
    dispatch({ type: LOADING, payload: false })
    console.log(data)
  }
}

export default getAllSales
