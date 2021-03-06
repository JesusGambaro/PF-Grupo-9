import axios from "axios"
import {
  GET_ALL_ORDERS,
  GET_LAST_SEVEN_DAYS_ORDERS,
  GET_ORDER_BY_EMAIL,
  GET_ORDER_DETAIL,
  GET_ALL_GAIN,
  UPDATE_ORDER,
} from "./actionsAdmin"

export const getLastSevenDaysOrders = (token) => {
  return async (dispatch) => {
    const data = await axios.get(`/orders/ByDate`, {
      headers: { Authorization: `bearer ${token}` },
    })
    dispatch({ type: GET_LAST_SEVEN_DAYS_ORDERS, payload: data.data })
  }
}

export const getAllOrders = (token) => {
  return async (dispatch) => {
    const data = await axios.get(`/orders`, {
      headers: { Authorization: `bearer ${token}` },
    })
    dispatch({ type: GET_ALL_ORDERS, payload: data.data })
  }
}

export const getOrderDetail = (token, order) => {
  return async (dispatch) => {
    const data = await axios.get(`/orders?order=${order}`, {
      headers: { Authorization: `bearer ${token}` },
    })

    dispatch({ type: GET_ORDER_DETAIL, payload: data.data })
  }
}

export const getOrderByEmail = (token, email) => {
  return async (dispatch) => {
    const data = await axios.get(`/orders?email=${email}`, {
      headers: { Authorization: `bearer ${token}` },
    })

    dispatch({ type: GET_ORDER_BY_EMAIL, payload: data.data })
  }
}

export const getOrderByStatus = (token, delivered) => {
  return async (dispatch) => {
    const data = await axios.get(`/orders?delivered=${delivered}`, {
      headers: { Authorization: `bearer ${token}` },
    })

    dispatch({ type: GET_ORDER_BY_EMAIL, payload: data.data })
  }
}
export const getAllGain = (token) => {
  return async (dispatch) => {
    const data = await axios.get(`/orders/totalGain`, {
      headers: { Authorization: `bearer ${token}` },
    })

    dispatch({ type: GET_ALL_GAIN, payload: data.data })
  }
}

export const updateOrder = (token, id, delivered) => {
  return async (dispatch) => {
    await axios.put(
      `/orders`,
      { delivered, id },
      {
        headers: { Authorization: `bearer ${token}` },
      }
    )
    const data = await axios.get(`/orders?order=${id}`, {
      headers: { Authorization: `bearer ${token}` },
    })

    dispatch({ type: GET_ORDER_DETAIL, payload: data.data })
  }
}
