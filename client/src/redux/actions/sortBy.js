import {ORDER_PRICE} from "./actions";
const sortByPrice = (order) => {
  return async (dispatch, getState) => {
    let filtered = [...getState().allData];
    if (order === "asc") {
      console.log(filtered);
      filtered.sort((a, b) => {
        return a.retailPrice - b.retailPrice;
      });
    } else if (order === "des")
      filtered.sort((a, b) => {
        return b.retailPrice - a.retailPrice;
      });
    dispatch({type: ORDER_PRICE, payload: filtered});
  };
};
const sortByGender = (gender) => {
  return async (dispatch, getState) => {
    let filtered = [...getState().allData];
    dispatch({
      type: ORDER_PRICE,
      payload: filtered.filter((shoe) => shoe.gender === gender),
    });
  };
};
export {sortByPrice, sortByGender};
