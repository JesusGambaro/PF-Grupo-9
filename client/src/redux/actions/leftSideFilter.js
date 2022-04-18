import { LEFT_SIDE_FILTERS } from "./actions";

const leftSideFilter = (filtroAgregar = null, valor = null) => {
  filtroAgregar = filtroAgregar.toLowerCase();
  console.log(filtroAgregar, valor);
  let payload = { name: filtroAgregar, value: valor };
  return async (dispatch, getState) => {
    console.log("ENTRE");
    let data = [...getState().allDataCopy];
    let filtros = [...getState().filters];
    let repetido = false;
    filtros.length > 0
      ? filtros.forEach((el) => {
          repetido = el.name === payload.name;
        })
      : (repetido = false);
    if (!repetido) {
      filtros = [...filtros, payload];
      console.log(filtros);
      dispatch({
        type: "@shoes/agregarFiltro",
        payload: payload,
      });
      /*
      {name: 
        value}
      */
      filtros.forEach((filtroName) => {
        let nombre = filtroName.name;
        data = data.filter((e) => {
          return e[nombre] === filtroName.value;
        });
      });
      dispatch({
        type: LEFT_SIDE_FILTERS,
        payload: data,
      });
    }
  };
};
export default leftSideFilter;
