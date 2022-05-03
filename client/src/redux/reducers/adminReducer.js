import {
  LOADING,
  GET_ALL_SALES,
  REGISTER_USER,
  LOGIN_USER,
  GET_ROLE,
} from "../actions/actions"

import {
  GET_ALL_PRODUCTS_A,
  GET_ALL_USERS,
  GET_LAST_SEVEN_DAYS_ORDERS,
  GET_ALL_ORDERS,
  GET_ORDER_DETAIL,
  GET_ORDER_BY_EMAIL,
  GET_ORDER_BY_STATUS,
  GET_ALL_GAIN,
  UPDATE_ORDER,
  UPDATE_PRODUCT,
  SEARCH_PRODUCT_A,
  SEARCH_USER_A,
  POST_PRODUCT,
  UPDATE_FORM_PRODUCT,
} from "../actions/actionsAdmin"
const initialState = {
  products: [],
  sales: [],
  loading: false,
  registerUser: {},
  loginUser: {},
  role: {},
  users: [],
  allOrders: [],
  lastOrders: [],
  orderDetail: {},
  gain: [],
  productsMessagge: {},
  productUpdateMessagge: {},
}
const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_A:
      return { ...state, products: action.payload }
    case GET_ALL_USERS:
      return { ...state, users: action.payload }
    case SEARCH_PRODUCT_A:
      return { ...state, products: action.payload }
    case UPDATE_PRODUCT:
      return { ...state, products: action.payload }
    case SEARCH_USER_A:
      return { ...state, users: action.payload }
    case LOADING:
      return { ...state, loading: action.payload }
    case GET_ALL_SALES:
      return { ...state, sales: action.payload }
    case REGISTER_USER:
      return { ...state, registerUser: action.payload }
    case LOGIN_USER:
      return { ...state, loginUser: action.payload }
    case GET_ROLE:
      return { ...state, role: action.payload }
    case GET_LAST_SEVEN_DAYS_ORDERS:
      return { ...state, lastOrders: action.payload }
    case GET_ALL_ORDERS:
      return { ...state, allOrders: action.payload }
    case GET_ORDER_DETAIL:
      return { ...state, orderDetail: action.payload }
    case GET_ORDER_BY_EMAIL:
      return { ...state, allOrders: action.payload }
    case GET_ORDER_BY_STATUS:
      return { ...state, allOrders: action.payload }
    case GET_ALL_GAIN:
      return { ...state, gain: action.payload }
    case UPDATE_ORDER:
      return { ...state, orderDetail: action.payload }
    case POST_PRODUCT:
      return { ...state, productsMessagge: action.payload }
    case UPDATE_FORM_PRODUCT:
      return { ...state, productUpdateMessagge: action.payload }
    default:
      return state
  }
}

export default adminReducer
