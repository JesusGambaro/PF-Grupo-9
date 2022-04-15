import {
  BRING_ALL_DATA,
  ORDER_NAME,
  ORDER_PRICE,
  LOADING,
  DETAIL,
  DETAILCOLOR,
  CLEARDETAIL
} from "../actions/actions";

const initialState = {
  allData: [],
  loading: false,
  filtereds: [],
  detail: {},
  detailColor: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case BRING_ALL_DATA:
      return { ...state, allData: action.payload };
    case ORDER_PRICE:
      return { ...state, allData: action.payload };
    case ORDER_NAME:
      break;
    case LOADING:
      return { ...state, loading: action.payload };
    case DETAIL:
      return { ...state, detail: action.payload };
    case DETAILCOLOR:
      return { ...state, detailColor: action.payload };
    case CLEARDETAIL:
      return { ...state, 
        detailColor: action.payload,
        detail:{}
      };
    default:
      return state;
  }
};
export default rootReducer;
