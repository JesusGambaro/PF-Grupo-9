import {
  BRING_ALL_DATA,
  SORT_BY,
  LOADING,
  DETAIL,
  DETAILCOLOR,
  CLEARDETAIL,
  GET_ALL_SALES,
  RESET,
  GET_ALL_CATEGORIES,
  REGISTER_USER,
  LOGIN_USER,
  GET_ROLE,

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
};
const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "@admin/init":
      return {...state, allData: action.payload};
    case GET_ALL_CATEGORIES:
      return {...state, categories: action.payload};
    case SORT_BY:
      return {...state, allData: action.payload};
    case LOADING:
      return { ...state, loading: action.payload };
    case DETAIL:
      return { ...state, detail: action.payload };
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
    case GET_ROLE:
      return { ...state, role: action.payload };
    default:
      return state;
  }
};
export default adminReducer;
