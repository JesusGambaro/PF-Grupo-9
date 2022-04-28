import axios from "axios";
import {SEARCH, LOADING} from "./actions";
import {SEARCH_PRODUCT_A} from "./actionsAdmin";
const URL = "http://localhost:3001/allFootwear?footwear=";

const search = (param, isAdmin) => {
  if (isAdmin) {
    return async (dispatch) => {
      dispatch({type: LOADING, payload: true});
      const {data} = await axios.get(URL + param);
      dispatch({type: SEARCH_PRODUCT_A, payload: data});
      dispatch({type: LOADING, payload: false});
    };
  } else {
    return async (dispatch) => {
      dispatch({type: LOADING, payload: true});
      const {data} = await axios.get(URL + param);
      dispatch({type: SEARCH, payload: data});
      dispatch({type: LOADING, payload: false});
    };
  }
};

export default search;
