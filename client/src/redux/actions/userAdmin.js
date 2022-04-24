import axios from "axios";
import {UPDATE_USERS, GET_ALL_USERS} from "./actionsAdmin";
import {LOADING} from "./actions";

const URL = "http://localhost:3001/user/";
const getAllUsers = (token) => {
  return async (dispatch) => {
    dispatch({type: LOADING, payload: true});
    const {data} = await axios.get(URL + "allUsers", {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    dispatch({type: GET_ALL_USERS, payload: data});
    dispatch({type: LOADING, payload: false});
  };
};

const deleteUser = (token, user) => {
  return async (dispatch, getState) => {
    dispatch({type: LOADING, payload: true});
    await axios.delete(`http://localhost:3001/user/deleteUser/${user.email}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    let oldData = getState().admin.users;
    let newData = oldData.filter((el) => {
      return el.email !== user.mail;
    });
    dispatch({type: UPDATE_USERS, payload: newData});
    dispatch({type: LOADING, payload: false});
  };
};
const changeUserRole = (token, user) => {
  console.log("=>>>>", user);
  return async (dispatch, getState) => {
    dispatch({type: LOADING, payload: true});
    await axios.put(`http://localhost:3001/user/changeAdminState`, user, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    let oldData = getState().admin.users;
    let newData = oldData.map((el) =>
      user.email === el.email ? {...el, isAdmin: user.adminState} : el
    );
    dispatch({type: UPDATE_USERS, payload: newData});
    dispatch({type: LOADING, payload: false});
  };
};
export {deleteUser, getAllUsers, changeUserRole};
