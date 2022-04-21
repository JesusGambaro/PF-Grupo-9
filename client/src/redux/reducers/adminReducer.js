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
  SEARCH,
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
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case BRING_ALL_DATA:
      return {...state, allData: action.payload, allDataCopy: action.payload};
    case LOAD_GENDERS:
      return {...state, genderData: action.payload};
    case "@shoes/agregarFiltro":
      return {...state, filters: [...state.filters, action.payload]};
    case "@shoes/borrarFiltros":
      return {...state, filters: action.payload};
    case "@shoes/genderActual":
      return {...state, genderActual: action.payload};
    case GET_ALL_CATEGORIES:
      return {...state, categories: action.payload};
    case GET_ALL_GENDERS:
      return {...state, genders: action.payload};
    case SORT_BY:
      return {...state, allData: action.payload};
    case LEFT_SIDE_FILTERS:
      return {...state, allData: action.payload};
    case SEARCH:
      return {...state, allData: action.payload};
    case LOADING:
      return {...state, loading: action.payload};
    case DETAIL:
      return {...state, detail: action.payload};
    case RESET:
      return {...state, allData: action.payload};
    case DETAILCOLOR:
      return {...state, detailColor: action.payload};
    case CLEARDETAIL:
      return {...state, detailColor: action.payload, detail: {}};
    case GET_ALL_SALES:
      return {...state, sales: action.payload};
    case REGISTER_USER:
      return {...state, registerUser: action.payload};
    case LOGIN_USER:
      return {...state, loginUser: action.payload};
    default:
      return state;
  }
};
export default rootReducer;
