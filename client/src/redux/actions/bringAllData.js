import axios from "axios";
import {BRING_ALL_DATA, LOADING, LOAD_GENDERS, GET_ALL_SALES} from "./actions";

const bringAllData = (load = true) => {
  return async (dispatch) => {
    load && dispatch({type: LOADING, payload: true});
    const {data} = await axios.get("/allFootwear");
    let filtered = data;
    let female = filtered.filter((shoe) => shoe.gender === "Female");
    let male = filtered.filter((shoe) => shoe.gender === "Male");
    let kids = filtered.filter((shoe) => shoe.gender === "Kids");
    let unisex = filtered.filter((shoe) => shoe.gender === "Unisex");
    let filtereds = {female, male, kids, unisex};
    let sales = data.filter((shoe) => shoe.sale > 0);
    dispatch({type: BRING_ALL_DATA, payload: data});
    dispatch({type: GET_ALL_SALES, payload: sales});
    dispatch({type: LOAD_GENDERS, payload: filtereds});
    dispatch({type: LOADING, payload: false});
  };
};

export default bringAllData;
