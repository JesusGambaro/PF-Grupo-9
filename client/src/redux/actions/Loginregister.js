import {
  LOGIN_USER,
  REGISTER_USER,
  CLEAR_USER,
  GET_ROLE,
} from "./actions";
import axios from "axios";
const URL = "http://localhost:3001/user";

export const registerUsers = (datos) => {
  return async (dispatch) => {
    const { data } = await axios.post(`${URL}/signUp`, datos);
    dispatch({
      type: REGISTER_USER,
      payload: data,
    });
  };
};

export const loginUsers = (datos) => {
  return async (dispatch) => {
    const { data } = await axios.post(`${URL}/signIn`, datos);
    dispatch({
      type: LOGIN_USER,
      payload: data,
    });
  };
};

export const roleUser = (token) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${URL}/role`, {
      headers: { "Authorization": `bearer ${token}` },
    });
    dispatch({
      type: GET_ROLE,
      payload: data,
    });
  };
};

export const loginGoogle = (datos) => {
  return async (dispatch) => {
    const { data } = await axios.post(`${URL}/SingUpOrSingInGoogle`, datos);
    dispatch({
      type: LOGIN_USER,
      payload: data,
    });
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
    payload: {},
  };
};
