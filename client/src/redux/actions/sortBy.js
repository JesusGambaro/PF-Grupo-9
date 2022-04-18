import {SORT_BY, RESET} from "./actions";

const sortByPrice = (order) => {
  return async (dispatch, getState) => {
    let filtered = [...getState().allDataCopy];
    if (order === "asc") {
      filtered.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (order === "des")
      filtered.sort((a, b) => {
        return b.price - a.price;
      });
    dispatch({type: SORT_BY, payload: filtered});
  };
};
const sortByGender = (gender) => {
  return async (dispatch, getState) => {
    let filtered = [...getState().allData];
    if (gender === "Kids")
      dispatch({
        type: SORT_BY,
        payload: filtered.filter((shoe) => shoe.gender === gender),
      });
    else
      dispatch({
        type: SORT_BY,
        payload: filtered.filter(
          (shoe) => shoe.gender === gender || shoe.gender === "Unisex"
        ),
      });
  };
};
const resetState = () => {
  return async (dispatch, getState) => {
    const state = getState().allData;
    dispatch({type: RESET, payload: state});
  };
};
export {sortByPrice, sortByGender, resetState};
