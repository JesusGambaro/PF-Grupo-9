import axios from "axios";
import {BRING_ALL_DATA, LOADING, LOAD_GENDERS} from "./actions";
const URL = "http://localhost:3001/allFootwear";

const bringAllData = () => {
  return async (dispatch) => {
    dispatch({type: LOADING, payload: true});
    const {data} = await axios.get(URL);
    let filtered = data;
    let female = filtered.filter((shoe) => shoe.gender === "Female");
    let male = filtered.filter((shoe) => shoe.gender === "Male");
    let kids = filtered.filter((shoe) => shoe.gender === "Kids");
    let unisex = filtered.filter((shoe) => shoe.gender === "Unisex");
    let filtereds = {female, male, kids, unisex};
    dispatch({type: BRING_ALL_DATA, payload: data});
    dispatch({type: LOAD_GENDERS, payload: filtereds});
    dispatch({type: LOADING, payload: false});
  };
};

export default bringAllData;
