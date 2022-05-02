import { LEFT_SIDE_FILTERS } from "./actions";

const genderFilter = (gender) => {
  return async (dispatch) => {
    dispatch({
      type: "@shoes/genderActual",
      payload: gender,
    });
  };
};
const deleteFilter = (filter) => {
  return async (dispatch, getState) => {
    let filtros = [...getState().root.filters];
    filtros = filtros.filter((e) => {
      return e.name !== filter;
    });
    dispatch({
      type: "@shoes/borrarFiltros",
      payload: filtros,
    });
  };
};
const leftSideFilter = (filtroAgregar = null, valor = null) => {
  return async (dispatch, getState) => {
    //console.log("leftSideFilters");
    let payload;
    let genderActual = getState().root.genderActual.toLowerCase();

    let data =
      genderActual !== "all"
        ? genderActual === "male" || genderActual === "female"
          ? [
              ...getState().root.genderData[genderActual],
              ...getState().root.genderData.unisex,
            ]
          : getState().root.genderData[genderActual]
        : [...getState().root.allDataCopy];

    let filtros = [...getState().root.filters];
    let repetido = false;
    if (filtroAgregar) {
      filtroAgregar = filtroAgregar.toLowerCase();
      payload = { name: filtroAgregar, value: valor };
      filtros.length > 0
        ? filtros.forEach((el) => {
            repetido = el.name === payload.name;
          })
        : (repetido = false);
      if (!repetido) {
        filtros = [...filtros, payload];
        dispatch({
          type: "@shoes/agregarFiltro",
          payload: payload,
        });
      } else {
        filtros = filtros.map((el) => {
          if (el.name === payload.name) {
            el.value = payload.value;
          }
          return el;
        });
      }
    }
    filtros.forEach((filtro) => {
      let nombre = filtro.name;
      data = data.filter((e) => {
        switch (nombre) {
          case "discount":
            return e.sale > 0;
          case "price":
            return (
              filtro.value.maxValue > e.finalPrice && e.finalPrice > filtro.value.minValue
            );
          case "size":
            let mandar = false;
            e.stocks.forEach((element) => {
              if (element.size === filtro.value) {
                mandar = true;
              }
            });
            if (mandar) return e;
            break;
          case "namebrand":
            let filtroVal = filtro.value.toLowerCase();
            if (filtroVal === "") {
              dispatch(deleteFilter("namebrand"));
            }
            return (
              e.brand.toLowerCase().includes(filtroVal) ||
              e.model.toLowerCase().includes(filtroVal)
            );
          default:
            return e[nombre] === filtro.value;
        }
      });
    });
    dispatch({
      type: LEFT_SIDE_FILTERS,
      payload: data,
    });
  };
};
const agregarFiltros = (arrayFiltros) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "@shoes/agregarFiltros",
      payload: arrayFiltros,
    });
  };
};
const resetFilters = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: "@shoes/borrarFiltros",
      payload: [],
    });
  };
};
export {
  leftSideFilter,
  resetFilters,
  genderFilter,
  deleteFilter,
  agregarFiltros,
};
