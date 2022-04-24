import axios from "axios";
import {BRING_ALL_DATA, LOADING, LOAD_GENDERS} from "./actions";
const URL = "http://localhost:3001/allFootwear";

const bringAllData = (isAdmin) => {
  if (isAdmin) {
    return async (dispatch) => {
      dispatch({type: "@admin/load", payload: true});
      const {data} = await axios.get(URL);
      console.log("Soy el admin", data);
      dispatch({type: "@admin/init", payload: data});
      dispatch({type: "@admin/load", payload: false});
    };
  } else {
    return async (dispatch) => {
      dispatch({type: LOADING, payload: true});
      const {data} = await axios.get(URL);
      console.log("Soy el home", data);
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
  }
};

export default bringAllData;
