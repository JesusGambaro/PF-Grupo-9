import axios from "axios";
import {BRING_ALL_DATA, LOADING} from "./actions";
const URL = "http://localhost:3001/sneaks";

const bringAllData = () => {
  return async (dispatch) => {
    dispatch({type: LOADING, payload: true});
    const {data} = await axios.get(URL);
    dispatch({type: BRING_ALL_DATA, payload: data});
    dispatch({type: LOADING, payload: false});
  };
};
const orderByName = () => {};
export default bringAllData;
