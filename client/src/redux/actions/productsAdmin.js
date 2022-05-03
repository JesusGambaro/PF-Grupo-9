import axios from "axios";
import {
  GET_ALL_PRODUCTS_A,
  POST_PRODUCT,
  UPDATE_FORM_PRODUCT,
  LOADING_A,
} from "./actionsAdmin";
import {SEARCH_PRODUCT_A} from "./actionsAdmin";
const getAllProductsAdmin = (token) => {
  return async (dispatch) => {
    dispatch({type: LOADING_A, payload: true});
    const {data} = await axios.get(
      `http://localhost:3001/allFootwear/allForAdmin`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    console.log("SOy el foots===>>", data);
    dispatch({type: GET_ALL_PRODUCTS_A, payload: data});
    dispatch({type: LOADING_A, payload: false});
  };
};

const searchProduct = (token, param) => {
  return async (dispatch) => {
    dispatch({type: LOADING_A, payload: true});
    let {data} = await axios.get(
      "http://localhost:3001/allFootwear?footwear=" + param,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    if (!data.length) data = [{msg: "No results"}];
    dispatch({type: SEARCH_PRODUCT_A, payload: data});
    dispatch({type: LOADING_A, payload: false});
  };
};

const postProduct = (token, newShoe, form) => {
  console.log("Soy el nuevo shoe=>>", newShoe);
  return async (dispatch, getState) => {
    dispatch({type: LOADING_A, payload: true});
    axios
      .post(`http://localhost:3001/allFootwear`, form, {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("sOY LA DATA===>", res.data);
        if (res.data) {
          dispatch({
            type: POST_PRODUCT,
            payload: res.data,
          });
          dispatch(getAllProductsAdmin(token));
          dispatch({type: LOADING_A, payload: false});
        }
      });
    /*     let oldData = getState().admin.products;
    let newData = {...oldData, newShoe};
    dispatch({type: UPDATE_PRODUCT, payload: newData}); */
  };
};

const editShoe = (token, editedShoe, form, id) => {
  console.log("Soy el EDITED====>", editedShoe);
  return async (dispatch, getState) => {
    dispatch({type: LOADING_A, payload: true});
    axios
      .put(`http://localhost:3001/allFootwear/${id}`, form, {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("sOY LA DATA===>", res.data);
        if (res.data) {
          dispatch({type: UPDATE_FORM_PRODUCT, payload: res.data});
          dispatch(getAllProductsAdmin(token));
          dispatch({type: LOADING_A, payload: false});
        }
      });
    //      let oldData = getState().admin.products;
    // let newData = oldData.map((el) => {
    //   return el.id === id ? editedShoe : el;
    // });
    // console.log("DAAT=>>", newData);
    // dispatch({type: UPDATE_PRODUCT, payload: newData});
  };
};

const deleteShoe = (token, id) => {
  console.log(id);
  return async (dispatch, getState) => {
    dispatch({type: LOADING_A, payload: true});
    await axios.delete(`http://localhost:3001/allFootwear/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    /* let oldData = getState().admin.products;
    console.log("Soy el old data===>", oldData);
    let newData = oldData.filter((el) => {
      return el.id !== id;
    });
    console.log("Soy el new data===>", newData);
    dispatch({type: UPDATE_PRODUCT, payload: newData}); */
    dispatch(getAllProductsAdmin(token));
    dispatch({type: LOADING_A, payload: false});
  };
};
export {postProduct, editShoe, deleteShoe, getAllProductsAdmin, searchProduct};
