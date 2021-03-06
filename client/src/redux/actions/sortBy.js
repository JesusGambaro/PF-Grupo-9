import { SORT_BY, RESET } from "./actions"
const sortByPrice = (order) => {
  return async (dispatch, getState) => {
    let filtered = [...getState().root.allData]
    if (order === "asc") {
      filtered.sort((a, b) => {
        return a.finalPrice - b.finalPrice
      })
    } else if (order === "des")
      filtered.sort((a, b) => {
        return b.finalPrice - a.finalPrice
      })
    dispatch({ type: SORT_BY, payload: filtered })
  }
}
const sortByGender = (gender) => {
  return async (dispatch, getState) => {
    let filtered = getState().root.genderData
    let genderLower = gender.toLowerCase()
    filtered =
      genderLower === "male" || genderLower === "female"
        ? [...filtered[genderLower], ...filtered.unisex]
        : filtered[genderLower]
    dispatch({
      type: SORT_BY,
      payload: filtered,
    })
  }
}
const resetState = () => {
  return async (dispatch, getState) => {
    const state = getState().root.allDataCopy
    dispatch({ type: RESET, payload: state })
  }
}
export { sortByPrice, sortByGender, resetState }
