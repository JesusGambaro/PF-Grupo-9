import axios from "axios"
import { GET_CART, LOADING_CART } from "./actions"

const URL = "/cart"

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

export const loadingCartBoolean = (payload) => {
  return {
    type: LOADING_CART,
    payload,
  }
}

export const deleteCartItem = (id, token) => {
  return async (dispatch, getState) => {
    await axios.delete(`${URL}/deleteCart/${id}`, {
      headers: { Authorization: `bearer ${token}` },
    })
    // let userData = getState().root.cartUser
    // userData = {
    //   ...userData,
    //   sameUserCartItems: userData.sameUserCartItems.filter((e) => {
    //     return e.id !== id
    //   }),
    // }
    const { data } = await axios.get(`${URL}`, {
      headers: { Authorization: `bearer ${token}` },
    })
    dispatch({
      type: GET_CART,
      payload: data,
    })
  }
}

export const deleteAllCart = (token) => {
  return async (dispatch) => {
    await axios.delete(`${URL}/deleteAllCart`, {
      headers: { Authorization: `bearer ${token}` },
    })
    const { data } = await axios.get(`${URL}`, {
      headers: { Authorization: `bearer ${token}` },
    })
    dispatch({
      type: GET_CART,
      payload: data,
    })
  }
}

export const addCart = (token, product) => {
  return async (dispatch) => {
    await axios.post(`${URL}`, product, {
      headers: { Authorization: `bearer ${token}` },
    })
    const { data } = await axios.get(`${URL}`, {
      headers: { Authorization: `bearer ${token}` },
    })
    dispatch({
      type: GET_CART,
      payload: data,
    })
  }
}

export const putCart = (token, product) => {
  return async (dispatch) => {
    await axios.put(`${URL}`, product, {
      headers: { Authorization: `bearer ${token}` },
    })
    const { data } = await axios.get(`${URL}`, {
      headers: { Authorization: `bearer ${token}` },
    })
    dispatch({
      type: GET_CART,
      payload: data,
    })
  }
}
