import axios from "axios";
import {POST_NEW_SHOE, EDIT_SHOE, DELETE_SHOE} from "./actionsAdmin";
import {LOADING} from "./actions";
const postProduct = (token, newShoe) => {
  console.log("Soy el nuevo shoe=>>", newShoe);
  return async (dispatch) => {
    dispatch({type: LOADING, payload: true});
    await axios.post(`http://localhost:3001/allFootwear`, newShoe, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    dispatch({type: POST_NEW_SHOE, payload: newShoe});
    dispatch({type: LOADING, payload: false});
  };
};
const editShoe = (token, editedShoe) => {
  return async (dispatch) => {
    dispatch({type: LOADING, payload: true});
    axios.put(`http://localhost:3001/allFootwear/${editedShoe.id}`, editedShoe,{
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    dispatch({type: EDIT_SHOE, payload: editShoe});
    dispatch({type: LOADING, payload: false});
  };
};
const deleteShoe = (id) => {
  return async (dispatch, getState) => {
    dispatch({type: LOADING, payload: true});
    await axios.delete(`http://localhost:3001/allFootwear/${id}`, {
      headers: {
        Authorization: `bearer ${window.localStorage.getItem("token")}`,
      },
    });
    let oldData = getState().admin.allDataCopy;
    console.log(oldData);
    let newData = oldData.filter((el) => {
      return el.id !== id;
    });
    console.log(newData);
    dispatch({type: DELETE_SHOE, payload: newData});
    dispatch({type: LOADING, payload: false});
  };
};
export {postProduct, editShoe, deleteShoe};
