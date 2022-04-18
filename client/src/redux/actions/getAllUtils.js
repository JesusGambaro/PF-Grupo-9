import axios from "axios";
import {GET_ALL_CATEGORIES, GET_ALL_GENDERS, LOADING} from "./actions";
const URL_CATEGORIES = "http://localhost:3001/allFootwear/allCategories";
const URL_GENDERS = "http://localhost:3001/allFootwear/allGenders";

const getAllCategories = () => {
  return async (dispatch) => {
    dispatch({type: LOADING, payload: true});
    const {data} = await axios.get(URL_CATEGORIES);
    dispatch({type: GET_ALL_CATEGORIES, payload: data});
    dispatch({type: LOADING, payload: false});
  };
};
const getAllGenders = () => {
  return async (dispatch) => {
    dispatch({type: LOADING, payload: true});
    const {data} = await axios.get(URL_GENDERS);
    dispatch({type: GET_ALL_GENDERS, payload: data});
    dispatch({type: LOADING, payload: false});
  };
};

export {getAllCategories, getAllGenders};
