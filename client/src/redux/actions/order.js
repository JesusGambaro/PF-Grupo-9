import axios from "axios"
import { CLEAN_ORDER, POST_ORDER } from "./actions"

const URL = "/orders"

export const postOrder = (token, order) => {
  return async (dispatch) => {
    await dispatch({
      type: CLEAN_ORDER,
    })
    const data = await axios.post(`${URL}`, order, {
      headers: { Authorization: `bearer ${token}` },
    })
    dispatch({
      type: POST_ORDER,
      payload: data.data /* data.data.error? data.data.error:data.data.msg */,
    })
  }
}
export const cleanOrder = () => {
  return {
    type: CLEAN_ORDER,
  }
}
