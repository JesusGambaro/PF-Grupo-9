import axios from "axios";
import {POST_NEW_SHOE, EDIT_SHOE, DELETE_SHOE} from "./actionsAdmin";
import {LOADING} from "./actions";
const postProduct = (newShoe) => {
  return async (dispatch) => {
    dispatch({type: LOADING, payload: true});
    const data = axios.post("http://localhost:3001/allFootwear/", newShoe);
    dispatch({type: POST_NEW_SHOE, payload: data});
    dispatch({type: LOADING, payload: false});
  };
};
const editShoe = (editedShoe) => {
  return async (dispatch) => {
    dispatch({type: LOADING, payload: true});
    const data = axios.put(
      `http://localhost:3001/allFootwear/:${editedShoe.id}`,
      editedShoe
    );

    dispatch({type: EDIT_SHOE, payload: data});
    dispatch({type: LOADING, payload: false});
  };
};
const deleteShoe = (id) => {
  return async (dispatch, getState) => {
    dispatch({type: LOADING, payload: true});
    //await axios.delete(`http://localhost:3001/allFootwear/${id}`);
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
