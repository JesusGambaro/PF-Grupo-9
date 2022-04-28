import { CHANGE_PASSWORD, CLEAR_PASSWORD } from "./actions";
import axios from "axios";
const URL="http://localhost:3001/user"

const changePassword = (datos, token) => {
  return async (dispatch) => {
    const { data } = await axios.post(`${URL}/change-password`, datos, {
      headers: { 'Authorization': `bearer ${token}` },
    });
    dispatch({
      type: CHANGE_PASSWORD,
      payload: data,
    });
  };
};

const forgottenPassword = (datos) => {
  return async (dispatch) => {
    const { data } = await axios.post(`${URL}/forgot-password`, datos);
    dispatch({
      type: CHANGE_PASSWORD,
      payload: data,
    });
  };
};

const changeForgottenPassword = (datos,token) => {
  return async (dispatch) => {
    const { data } = await axios.post(`${URL}/forgot-password/${token}`, datos);
    dispatch({
      type: CHANGE_PASSWORD,
      payload: data,
    });
  };
};

const clearPassword=()=>{
  return {
    type:CLEAR_PASSWORD,
    payload:{}
  }
}