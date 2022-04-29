import axios from "axios";
import { GET_FAV } from "./actions";

const URL = "http://localhost:3001/favorite";

export const getUserFav = (token) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${URL}`, {
      headers: { Authorization: `bearer ${token}` },
    });
    dispatch({
      type: GET_FAV,
      payload: data,
    });
  };
};

export const deleteFavItem = (id, token) => {
  return async (dispatch, getState) => {
    await axios.delete(`${URL}/${id}`, {
      headers: { Authorization: `bearer ${token}` },
    });
    let userData = getState().root.favUser;
    userData = userData.filter((e) => {
      return e.id !== id;
    });
    //console.log("userData: ", userData);
    dispatch({
      type: GET_FAV,
      payload: userData,
    });
  };
};

export const deleteAllFav = (token) => {
  return async (dispatch) => {
    await axios.delete(`${URL}/deleteAll`, {
      headers: { Authorization: `bearer ${token}` },
    });
    dispatch({
      type: GET_FAV,
      payload: [],
    });
  };
};

export const addFav = (token, product) => {
  return async () => {
    await axios.post(`${URL}`, product, {
      headers: { Authorization: `bearer ${token}` },
    });
  };
};
