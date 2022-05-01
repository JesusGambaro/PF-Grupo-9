import axios from "axios";
import {GET_FAV, LOAD_GENDERS,LEFT_SIDE_FILTERS,BRING_ALL_DATA} from "./actions";
import {leftSideFilter} from "./leftSideFilter";
const URL = "http://localhost:3001/favorite";
export const getUserFav = (token) => {
  return async (dispatch) => {
    const {data} = await axios.get(`${URL}`, {
      headers: {Authorization: `bearer ${token}`},
    });
    console.log("getUserFav data: ",data);
    dispatch({
      type: GET_FAV,
      payload: data,
    });
    data.map((shoe)=> dispatch(filtrarLosFav(shoe.product.id,true)))
  };
};

export const deleteFavItem = (id, token) => {
  return async (dispatch, getState) => {
    await axios.delete(`${URL}/${id}`, {
      headers: {Authorization: `bearer ${token}`},
    });
    let userData = getState().root.favUser;
    userData = userData.filter((e) => {
      return e.id !== id;
    });

    dispatch({
      type: GET_FAV,
      payload: userData,
    });
    dispatch(filtrarLosFav(id,false));
  };
};

export const deleteAllFav = (token) => {
  return async (dispatch) => {
    await axios.delete(`${URL}/deleteAll`, {
      headers: {Authorization: `bearer ${token}`},
    });
    dispatch({
      type: GET_FAV,
      payload: [],
    });
    
  };
};

export const addFav = (token, product) => {
  return async (dispatch, getState) => {
    await axios.post(`${URL}`, product, {
      headers: {Authorization: `bearer ${token}`},
    });
    console.log("addFavFunc");
    dispatch(filtrarLosFav(product.productId,true)); 
  };
};

const filtrarLosFav = (idFav, isFavorite) => {
  return async (dispatch, getState) => {
    console.log("filtrarLosFav");
    let filtered = getState().root.genderData;
    let allDataCopy = getState().root.allDataCopy;
    allDataCopy = allDataCopy.map((shoe) => {
      return shoe.id === idFav ? {...shoe, isFavorite: isFavorite} : shoe;
    })
    let female = filtered.female.map((shoe) => {
      //console.log(shoe.id ," ", idFav);
      return shoe.id === idFav ? {...shoe, isFavorite: isFavorite} : shoe;
    });
    let male = filtered.male.map((shoe) => {
      //console.log(shoe.id === idFav ? "Hay un fav" : "");
      return shoe.id === idFav ? {...shoe, isFavorite: isFavorite} : shoe;
    });
    let kids = filtered.kids.map((shoe) => {
      //console.log(shoe.id === idFav ? "Hay un fav" : "");
      return shoe.id === idFav ? {...shoe, isFavorite: isFavorite} : shoe;
    });
    let unisex = filtered.unisex.map((shoe) => {
      //console.log(shoe.id === idFav ? "Hay un fav" : "");
      return shoe.id === idFav ? {...shoe, isFavorite: isFavorite} : shoe;
    });
    let filtereds = {female, male, kids, unisex};
    dispatch({type: BRING_ALL_DATA, payload: allDataCopy});
    dispatch({type: LOAD_GENDERS, payload: filtereds});
    dispatch(leftSideFilter());
  };
};
