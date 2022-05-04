import axios from "axios"
import { GET_FAV, LOAD_GENDERS, BRING_ALL_DATA, GET_ALL_SALES } from "./actions"
import { leftSideFilter } from "./leftSideFilter"
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
    dispatch(filtrarLosFav(null, false))
    data.map((shoe) => dispatch(filtrarLosFav(shoe.product.id, true)))
  }
}

export const deleteFavItem = (id, token) => {
  return async (dispatch, getState) => {
    await axios.delete(`${URL}/${id}`, {
      headers: { Authorization: `bearer ${token}` },
    })
    let userData = getState().root.favUser
    userData = userData.filter((e) => {
      return e.product.id !== id
    })

    dispatch({
      type: GET_FAV,
      payload: userData,
    })
    dispatch(filtrarLosFav(id, false))
  }
}

export const deleteAllFav = (token) => {
  return async (dispatch) => {
    await axios.delete(`${URL}/deleteAll`, {
      headers: { Authorization: `bearer ${token}` },
    })
    dispatch({
      type: GET_FAV,
      payload: [],
    })
    dispatch(filtrarLosFav(null, false))
  }
}

export const addFav = (token, product) => {
  return async (dispatch) => {
    const addFavIten = await axios.post(`${URL}`, product, {
      headers: { Authorization: `bearer ${token}` },
    })
    /*dispatch({
      type: GET_FAV,
      payload: [...userData,addFavIten],
    })*/
    dispatch(filtrarLosFav(product.productId, true))
  }
}

const filtrarLosFav = (idFav = null, isFavorite) => {
  return async (dispatch, getState) => {
    let filtered = getState().root.genderData
    let allDataCopy = getState().root.allDataCopy
    let sales = getState().root.sales
    allDataCopy = allDataCopy.map((shoe) => {
      if (!idFav) return { ...shoe, isFavorite: isFavorite }
      return shoe.id === idFav ? { ...shoe, isFavorite: isFavorite } : shoe
    })
    sales = sales.map((shoe) => {
      if (!idFav) return { ...shoe, isFavorite: isFavorite }
      return shoe.id === idFav ? { ...shoe, isFavorite: isFavorite } : shoe
    })
    Object.keys(filtered).forEach((key) => {
      filtered[key] = filtered[key].map((shoe) => {
        if (!idFav) return { ...shoe, isFavorite: isFavorite }
        return shoe.id === idFav ? { ...shoe, isFavorite: isFavorite } : shoe
      })
    })
    dispatch({ type: BRING_ALL_DATA, payload: allDataCopy })
    dispatch({ type: GET_ALL_SALES, payload: sales })
    dispatch({ type: LOAD_GENDERS, payload: filtered })
    dispatch(leftSideFilter())
  }
}
