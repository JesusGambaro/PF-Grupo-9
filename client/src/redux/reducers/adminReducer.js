import {
  LOADING,
  GET_ALL_SALES,
  REGISTER_USER,
  LOGIN_USER,
  GET_ROLE,
} from "../actions/actions";

import {
  POST_NEW_SHOE,
  DELETE_USER,
  EDIT_SHOE,
  GET_ALL_USERS,
  DELETE_SHOE,
  GET_LAST_SEVEN_DAYS_ORDERS,
  GET_ALL_ORDERS,
  GET_ORDER_DETAIL,
  GET_ORDER_BY_EMAIL,
  GET_ORDER_BY_STATUS,
} from "../actions/actionsAdmin";
const initialState = {
  allData: [],
  allDataCopy: [],
  sales: [],
  loading: false,
  registerUser: {},
  loginUser: {},
  role: {},
  users: [],
  allOrders: [],
  lastOrders: [],
  orderDetail:[]
};
const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "@admin/init":
      return {...state, allData: action.payload, allDataCopy: action.payload};
    case GET_ALL_USERS:
      return {...state, users: action.payload};
    case POST_NEW_SHOE:
      return {...state, allData: [action.payload, ...state.allData]};
    case DELETE_SHOE:
      return {...state, allData: action.payload, allDataCopy: action.payload};
    case DELETE_USER:
      return {...state, users: action.payload};
    case LOADING:
      return {...state, loading: action.payload};
    case GET_ALL_SALES:
      return {...state, sales: action.payload};
    case REGISTER_USER:
      return {...state, registerUser: action.payload};
    case LOGIN_USER:
      return {...state, loginUser: action.payload};
    case GET_ROLE:
      return {...state, role: action.payload};
    case GET_LAST_SEVEN_DAYS_ORDERS:
      return {...state, lastOrders: action.payload};
    case GET_ALL_ORDERS:
      return {...state, allOrders: action.payload};

    case GET_ORDER_DETAIL:
      return {...state, orderDetail: action.payload};

    case GET_ORDER_BY_EMAIL:
      return {...state, allOrders: action.payload};

    case GET_ORDER_BY_STATUS:
      return {...state, allOrders: action.payload};
    default:
      return state;
  }
};

export default adminReducer;
