import {
  BRING_ALL_DATA,
  SORT_BY,
  LOADING,
  DETAIL,
  DETAILCOLOR,
  CLEARDETAIL,
  RESET,
} from "../actions/actions";

const initialState = {
  allData: [],
  allDataCopy: [],
  loading: false,
  filtereds: [],
  detail: {},
  detailColor: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case BRING_ALL_DATA:
      return { ...state, allData: action.payload };
    case SORT_BY:
      return {...state, allDataCopy: action.payload};
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
    case RESET:
      return {...state, allDataCopy: action.payload};
    default:
      return state;
  }
};
export default rootReducer;
