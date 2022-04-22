import axios from "axios";
import {DELETE_USER, GET_ALL_USERS} from "./actionsAdmin";
import {LOADING} from "./actions";

const URL = "http://localhost:3001/user/";

const users = [
  {
    userName: "pepe123",
    email: "manolino@hayo.com",
    password: "elmosquito",
    isAdmin: false,
    id: 1,
  },
  {
    userName: "manrint123#",
    email: "pepo@gmail.com",
    password: "armandoVanquitos32",
    isAdmin: true,
    id: 2,
  },
  {
    userName: "julioCesar",
    email: "caligula@tryoa.com",
    password: "gendarmes9293",
    isAdmin: false,
    id: 3,
  },
];

const getAllUsers = () => {
  return async (dispatch) => {
    dispatch({type: LOADING, payload: true});
    //const {data} = await axios.get(URL + "allUsers");
    dispatch({type: GET_ALL_USERS, payload: users});
    dispatch({type: LOADING, payload: false});
  };
};

const deleteUser = (id) => {
  return async (dispatch, getState) => {
    dispatch({type: LOADING, payload: true});
    //await axios.delete(URL${id}`);
    let oldData = getState().admin.users;
    let newData = oldData.filter((el) => {
      return el.id !== id;
    });
    dispatch({type: DELETE_USER, payload: newData});
    dispatch({type: LOADING, payload: false});
  };
};
export {deleteUser, getAllUsers};
