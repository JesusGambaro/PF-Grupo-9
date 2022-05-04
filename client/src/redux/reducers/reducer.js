import {
  BRING_ALL_DATA,
  LOAD_GENDERS,
  SORT_BY,
  LEFT_SIDE_FILTERS,
  LOADING,
  DETAIL,
  DETAILCOLOR,
  CLEARDETAIL,
  GET_ALL_SALES,
  RESET,
  GET_ALL_CATEGORIES,
  GET_ALL_GENDERS,
  REGISTER_USER,
  LOGIN_USER,
  CLEAR_USER,
  SEARCH,
  GET_ROLE,
  GET_CART,
  DELETE_CART,
  GET_FAV,
  DELETE_FAV,
  GET_PROFILE,
  LOADING_CART,
  USER_INFO,
  CHANGE_PASSWORD,
  CLEAR_PASSWORD,
  POST_ORDER,
  CLEAN_ORDER,
  POST_REVIEW,
} from "../actions/actions";

const initialState = {
  allData: [],
  allDataCopy: [],
  sales: [],
  loading: false,
  filtereds: [],
  detail: {},
  detailColor: [],
  categories: [],
  genders: [],
  filters: [],
  genderData: {},
  genderActual: "all",
  registerUser: {},
  loginUser: {},
  role: {},
  cartUser: [],
  favUser: [],
  orderUser: [],
  loadingCart: true,
  user: {},
  changePasswort: {},
  paymentInfo: [],
  review: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case BRING_ALL_DATA:
      return { ...state, allData: action.payload, allDataCopy: action.payload };
    case LOAD_GENDERS:
      return { ...state, genderData: action.payload };
    case "@shoes/agregarFiltro":
      return { ...state, filters: [...state.filters, action.payload] };
    case "@shoes/agregarFiltros":
      return { ...state, filters: action.payload };
    case "@shoes/borrarFiltros":
      return { ...state, filters: action.payload };
    case "@shoes/genderActual":
      return { ...state, genderActual: action.payload };
    case GET_ALL_CATEGORIES:
      return { ...state, categories: action.payload };
    case GET_ALL_GENDERS:
      return { ...state, genders: action.payload };
    case SORT_BY:
      return { ...state, allData: action.payload };
    case LEFT_SIDE_FILTERS:
      return { ...state, allData: action.payload };
    case LOADING:
      return { ...state, loading: action.payload };
    case DETAIL:
      return { ...state, detail: action.payload };
    case SEARCH:
      return { ...state, allData: action.payload };
    case RESET:
      return { ...state, allData: action.payload };
    case DETAILCOLOR:
      return { ...state, detailColor: action.payload };
    case CLEARDETAIL:
      return { ...state, detailColor: action.payload, detail: {} };
    case GET_ALL_SALES:
      return { ...state, sales: action.payload };
    case REGISTER_USER:
      return { ...state, registerUser: action.payload };
    case LOGIN_USER:
      return { ...state, loginUser: action.payload };
    case CLEAR_USER:
      return {
        ...state,
        loginUser: action.payload,
        registerUser: action.payload,
        role: action.payload,
      };
    case GET_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    case GET_CART:
      return {
        ...state,
        cartUser: action.payload,
        loadingCart: false,
      };
    case DELETE_CART:
      return {
        ...state,
        cartUser: action.payload,
      };
    case GET_FAV:
      return {
        ...state,
        favUser: action.payload,
      };
    case DELETE_FAV:
      return {
        ...state,
        favUser: action.payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        orderUser: action.payload,
      };
    case LOADING_CART:
      return {
        ...state,
        loadingCart: action.payload,
      };
    case USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        changePasswort: action.payload,
      };
    case CLEAR_PASSWORD:
      return {
        ...state,
        changePasswort: action.payload,
      };

    case POST_ORDER:
      return {
        ...state,
        paymentInfo: action.payload,
      };
    case CLEAN_ORDER:
      return {
        ...state,
        paymentInfo: {},
      };
    case POST_REVIEW:
      return {
        ...state,
        review: action.payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
