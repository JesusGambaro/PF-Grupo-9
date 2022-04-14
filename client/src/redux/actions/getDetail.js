import axios from "axios";
import {BRING_ALL_DATA, LOADING, DETAIL} from "./actions";
const URL = "http://localhost:3001/sneaks";

const getDetail = (id) => {
  return async (dispatch) => {
    dispatch({type: LOADING, payload: true});
    const {data} = await axios.get(URL);
    const shoeFinded = data.find((e) => e.id === id);
    dispatch({type: DETAIL, payload: shoeFinded});
    dispatch({type: LOADING, payload: false});
  };
};
export default getDetail;
