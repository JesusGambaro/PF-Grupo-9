import axios from "axios";
import { LOADING, DETAIL } from "./actions";

const getDetail = (id) => {
  return async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    const data = await axios.get(`http://localhost:3001/allFootwear/${id}`);
    dispatch({ type: DETAIL, payload: data });
    dispatch({ type: LOADING, payload: false });
  };
};
export default getDetail;
