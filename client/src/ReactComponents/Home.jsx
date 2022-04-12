import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const axios = require("axios").default;
export default function Home() {
  const shoesStore = useSelector((state) => {
    console.log(state ? state.data : undefined);
    return state ? state.data : undefined;
  });

  const [shoesData, SetShoesData] = useState(shoesStore ? shoesStore : []);
  const dispatch = useDispatch();
  const TraerDatosDeLaApi = async () => {
    const datosShoes = await (
      await axios.get("http://localhost:4001/data")
    ).data;
    console.log("Se trajeron los Datos");
    mandarLosDatos(datosShoes);
    HandleShoesData(datosShoes);
    return datosShoes;
  };
  const mandarLosDatos = async (proms) => {
    await dispatch({
      type: "TraerDatos",
      payload: await proms,
    });
    //console.log(proms)
  };

  const HandleShoesData = (proms) => {
    SetShoesData(proms);
  };
  useEffect(() => {
    const a = async () => {
      let data = await TraerDatosDeLaApi();
    };
    a();
  }, []);

  const filtrarPorPrecio = async () => {
    await dispatch({
      type: "Reset",
    });
    HandleShoesData(shoesStore);
    await dispatch({
        type: "Ordenar",
        tipo: "LowerToHigh",
    });
    HandleShoesData(shoesStore);
};
  return (
    <div className="Home">
      <h1>Hola</h1>
      <button onClick={filtrarPorPrecio}></button>
      {shoesData.length > 1 ? (
        <ol>
          {shoesData.map((el) => {
            return (
              <li>
                <h4> {`name:${el.name}price:${el.estimatedMarketValue}`} </h4>
              </li>
            );
          })}
        </ol>
      ) : (
        "b"
      )}
    </div>
  );
}
