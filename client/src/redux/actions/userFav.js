import axios from "axios"
import { GET_FAV, } from "./actions"

const URL = "http://localhost:3001/favorite"

export const getUserFav = (token) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${URL}`, {
      headers: { Authorization: `bearer ${token}` },
    })
    dispatch({
      type: GET_FAV,
      payload: data,
    })
  }
}


export const deleteFavItem = (id, token) => {
  return async (dispatch, useSelector) => {
    await axios.delete(`${URL}/${id}`, {
      headers: { Authorization: `bearer ${token}` },
    })

   /*  dispatch({
      type: GET_FAV,
      payload: data,
    }) */
  }
}

export const deleteAllFav = (token) => {
  return async (dispatch) => {
    await axios.delete(`${URL}/deleteAll`, {
      headers: { Authorization: `bearer ${token}` },
    })
    
    const { data } = await axios.get(`${URL}`, {
      headers: { Authorization: `bearer ${token}` },
    })
    dispatch({
      type: GET_FAV,
      payload: data,
    })
  }
}

export const addFav = (token, product) => {
  return async () => {
    await axios.post(`${URL}`, product, {
      headers: { Authorization: `bearer ${token}` },
    })
  }
}

