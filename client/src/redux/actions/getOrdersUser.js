import axios from "axios"
import { GET_PROFILE, USER_INFO } from "./actions"
const URL = "/orders/userOrders"
const URL2 = "/user/userName"

export const getOrderProfile = (token) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${URL}`, {
      headers: { Authorization: `bearer ${token}` },
    })
    dispatch({
      type: GET_PROFILE,
      payload: data,
    })
  }
}

export const userInfo = (token) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${URL2}`, {
      headers: { Authorization: `bearer ${token}` },
    })
    dispatch({
      type: USER_INFO,
      payload: data,
    })
  }
}
