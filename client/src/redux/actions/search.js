import axios from "axios"
import { SEARCH, LOADING } from "./actions"
const URL = "/allFootwear?footwear="

const search = (param) => {
  return async (dispatch) => {
    dispatch({ type: LOADING, payload: true })
    const { data } = await axios.get(URL + param)
    dispatch({ type: SEARCH, payload: data })
    dispatch({ type: LOADING, payload: false })
  }
}

export default search
