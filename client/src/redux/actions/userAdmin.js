import axios from "axios";
import {DELETE_USER, GET_ALL_USERS} from "./actionsAdmin";
import {LOADING} from "./actions";

const URL = "http://localhost:3001/user/";
const getAllUsers = () => {
  return async (dispatch) => {
    dispatch({type: LOADING, payload: true});
    const {data} = await axios.get(URL + "allUsers", {
      headers: {
        Authorization: `bearer ${window.localStorage.getItem("token")}`,
      },
    });
    dispatch({type: GET_ALL_USERS, payload: data});
    dispatch({type: LOADING, payload: false});
  };
};

const deleteUser = (userName) => {
  return async (dispatch, getState) => {
    dispatch({type: LOADING, payload: true});
    await axios.delete(URL + userName, {
      headers: {
        Authorization: `bearer ${window.localStorage.getItem("token")}`,
      },
    });
    let oldData = getState().admin.users;
    let newData = oldData.filter((el) => {
      return el.userName !== userName;
    });
    dispatch({type: DELETE_USER, payload: newData});
    dispatch({type: LOADING, payload: false});
  };
};
export {deleteUser, getAllUsers};
