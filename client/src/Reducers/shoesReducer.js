const axios = require("axios").default;
export const shoesReducer = (state = { data: [], copy: [] }, action) => {
  switch (action.type) {
    case "TraerDatos":
      return { ...state, data: action.payload, copy: action.payload };
    //Filtro Por Precio
    case "Ordenar":
        console.log("Ordenando");
        let tipo = action.tipo;
        let ordenado = state.copy.sort((a, b) => {
            if (a.estimatedMarketValue > b.estimatedMarketValue) {
                return 1;
            }
            if (a.estimatedMarketValue < b.estimatedMarketValue) {
                return -1;
            }
            if (a.estimatedMarketValue === b.estimatedMarketValue) {
                return 0;
            }
      });
      return { ...state, data: ordenado };
    case "Reset":
      return { data: [], ...state };
  }
};
