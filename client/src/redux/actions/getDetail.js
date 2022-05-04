import axios from "axios"
import { LOADING, DETAIL, DETAILCOLOR, CLEARDETAIL } from "./actions"

export const getDetail = (id) => {
  return async (dispatch) => {
    dispatch({ type: LOADING, payload: true })
    const { data } = await axios.get(`/allFootwear/${id}`)
    dispatch({ type: DETAIL, payload: data })
    dispatch({ type: LOADING, payload: false })
  }
}

export const getDetailColor = (model) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/allFootwear/detail/${model}`)
    dispatch({ type: DETAILCOLOR, payload: data })
  }
}

export const clearDetail = () => {
  return {
    type: CLEARDETAIL,
    payload: [],
  }
}
