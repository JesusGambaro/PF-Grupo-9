import axios from "axios";
import {GET_ALL_PRODUCTS_A} from "./actionsAdmin";
import {LOADING} from "./actions";
import bringAllData from "./bringAllData"
import { SEARCH_PRODUCT_A, UPDATE_FORM_PRODUCT } from "./actionsAdmin"

const getAllProductsAdmin = (token) => {
  return async (dispatch) => {
    dispatch({ type: LOADING, payload: true })
    const { data } = await axios.get(
      `http://localhost:3001/allFootwear/allForAdmin`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    )
    console.log("SOy el foots===>>", data)
    dispatch({ type: GET_ALL_PRODUCTS_A, payload: data })
    dispatch({ type: LOADING, payload: false })
  }
}

const searchProduct = (token, param) => {
  return async (dispatch) => {
    dispatch({ type: LOADING, payload: true })
    let { data } = await axios.get(
      "http://localhost:3001/allFootwear?footwear=" + param,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    )
    if (!data.length) data = [{ msg: "No results" }]
    dispatch({ type: SEARCH_PRODUCT_A, payload: data })
    dispatch({ type: LOADING, payload: false })
  }
}

const postProduct = (token, newShoe, form) => {
  console.log("Soy el nuevo shoe=>>", newShoe)
  return async (dispatch, getState) => {
    dispatch({type: LOADING, payload: true});
    const response=await axios.post(`http://localhost:3001/allFootwear`, form, {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
    console.log("sOY LA DATA===>", response.data);
    if (response.data) {
          dispatch(getAllProductsAdmin(token));
          dispatch({type: LOADING, payload: false});
        };
    /*     let oldData = getState().admin.products;
    let newData = {...oldData, newShoe};
    dispatch({type: UPDATE_PRODUCT, payload: newData}); */
  }
}

const editShoe = (token, editedShoe, form, id) => {
  console.log("Soy el EDITED====>", editedShoe)
  return async (dispatch, getState) => {
    dispatch({ type: LOADING, payload: true })
    const { data } = await axios.put(
      `http://localhost:3001/allFootwear/${id}`,
      form,
      {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    )
    //      let oldData = getState().admin.products;
    // let newData = oldData.map((el) => {
    //   return el.id === id ? editedShoe : el;
    // });
    // console.log("DAAT=>>", newData);
    // dispatch({type: UPDATE_PRODUCT, payload: newData});
    dispatch({ type: UPDATE_FORM_PRODUCT, payload: data })
    dispatch(getAllProductsAdmin(token))
    dispatch(bringAllData(false));
    dispatch({ type: LOADING, payload: false })
  }
}

const deleteShoe = (token, id) => {
  console.log(id)
  return async (dispatch, getState) => {
    dispatch({ type: LOADING, payload: true })
    await axios.delete(`http://localhost:3001/allFootwear/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    /* let oldData = getState().admin.products;
    console.log("Soy el old data===>", oldData);
    let newData = oldData.filter((el) => {
      return el.id !== id;
    });
    console.log("Soy el new data===>", newData);
    dispatch({type: UPDATE_PRODUCT, payload: newData}); */
    dispatch(bringAllData(false))
    dispatch(getAllProductsAdmin(token));
    dispatch({type: LOADING, payload: false});
  };
};
export {postProduct, editShoe, deleteShoe, getAllProductsAdmin, searchProduct};
