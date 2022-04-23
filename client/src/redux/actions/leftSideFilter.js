import { LEFT_SIDE_FILTERS } from "./actions";

const genderFilter = (gender) => {
  return async (dispatch, getState) => {
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
    let payload;
    let genderActual = getState().root.genderActual.toLowerCase();

    let data =
      genderActual !== "all"
        ? getState().root.genderData[genderActual]
        : [...getState().root.allDataCopy];

    let filtros = [...getState().root.filters];
    let repetido = false;
    if (filtroAgregar && valor) {
      //console.log("ENTRE AL IF");
      filtroAgregar = filtroAgregar.toLowerCase();
      payload = { name: filtroAgregar, value: valor };
      //console.log(payload);
      filtros.length > 0
        ? filtros.forEach((el) => {
            console.log(el.name);
            repetido = el.name === payload.name;
          })
        : (repetido = false);
      if (!repetido) {
        //console.log("NO SE REPITIO");
        filtros = [...filtros, payload];
        //console.log(filtros);
        dispatch({
          type: "@shoes/agregarFiltro",
          payload: payload,
        });
      } else {
        //console.log("SE REPITIO");
        filtros = filtros.map((el) => {
          if (el.name === payload.name) {
            el.value = payload.value;
          }
          return el;
        });
        //console.log(filtros);
      }
    }
    /*
      {name: 
        value}
      */
    //console.log("ORDENO");
    filtros.forEach((filtro) => {
      let nombre = filtro.name;
      console.log(nombre , (nombre === "nameBrand" ? " == " : " != ") , "namebrand");
      data = data.filter((e) => {
        switch (nombre) {
          case "sale":
            //console.log("sale");
            return e.sale > 0;
          case "price":
            //console.log(filtro);
            return (
              filtro.value.maxValue > e.price && e.price > filtro.value.minValue
            );
          case "size":
            let mandar = false;
            e.stocks.forEach((element) => {
              if (element.size === filtro.value) {
                mandar = true;
                console.log("Encontro Size");
              }
            });
            if (mandar) return e;
            break;
          case "namebrand":
            let filtroVal = filtro.value.toLowerCase();
            return (e.brand.toLowerCase() === filtroVal || (e.model.toLowerCase()).includes(filtroVal));
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
}
const resetFilters = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: "@shoes/borrarFiltros",
      payload: [],
    });
  };
};
export { leftSideFilter, resetFilters, genderFilter, deleteFilter,agregarFiltros };
