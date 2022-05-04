import { CHANGE_PASSWORD, CLEAR_PASSWORD } from "./actions"
import axios from "axios"
const URL = "/user"

export const changePassword = (datos, token) => {
  return async (dispatch) => {
    const { data } = await axios.post(`/user/change-password`, datos, {
      headers: { Authorization: `bearer ${token}` },
    })
    dispatch({
      type: CHANGE_PASSWORD,
      payload: data,
    })
  }
}

export const forgottenPassword = (datos) => {
  return async (dispatch) => {
    const { data } = await axios.post(`/user/forgot-password`, {
      email: datos,
    })
    dispatch({
      type: CHANGE_PASSWORD,
      payload: data,
    })
  }
}

export const changeForgottenPassword = (datos, token) => {
  return async (dispatch) => {
    const { data } = await axios.post(`${URL}/forgot-password/${token}`, {
      password: datos,
    })
    dispatch({
      type: CHANGE_PASSWORD,
      payload: data,
    })
  }
}

export const clearPassword = () => {
  return {
    type: CLEAR_PASSWORD,
    payload: {},
  }
}
