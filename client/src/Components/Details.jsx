import "../Css/Details.css";

import { data } from "./data";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getDetailColor, clearDetail } from "../redux/actions/getDetail";
import bringAllData from "../redux/actions/bringAllData";
import Loading from "./Loading";

function Details() {

  const dispatch = useDispatch();
  const { id, model } = useParams();
  const initialMount = useRef(true);
  const { detail, loading, detailColor, allData } = useSelector((state) => state);

  const [stock, setStock] = useState();
  const [size, setSize] = useState([]);
  const [Images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState();
  const [sizeSelect, setSizeSelect] = useState();
  const [colorSelect, setColorSelect] = useState();


  const handleMainImage = (e) => {
    setMainImage(e.target.src);
  };

  const handleColor = (e) => {
    setColorSelect(e.target.value)
    let index = e.target.selectedIndex;
    let identificador = e.target.options[index].id

    const shoes = detailColor.find(detail => detail.id == identificador)
    setImages(shoes.images)
    setMainImage(shoes.images[0].url)
    setSize(shoes.stocks)
    setStock(shoes.stocks[0].amount)
  };

  const handleSize = (e) => {
    setSizeSelect(e.target.value)
    let index = e.target.selectedIndex;
    let identificador = e.target.options[index].id
    const stock = size.find(siz => siz.id == identificador)
    setStock(stock.amount)
  };

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getDetailColor(model));
    if (allData.length === 0) dispatch(bringAllData())

    if (initialMount.current) initialMount.current = false;

  }, [initialMount]);

  useEffect(() => {
    return () => dispatch(clearDetail())
  }, [])
  console.log(detail)
  return (
    <div style={{ marginTop: "4rem" }}>
      {loading ?
        <Loading />
        : (
          <>
            <div className="container mt-5 mb-5 rounded-3 shadow-lg">
              <div className="row pt-4 pb-4 bg-white">
                <h1 className="text-info text-center">{detail.brand} {detail.model}</h1>
              </div>

              <div className="row overflow-hidden bg-secondary h-auto">
                <div className="col bg-white">
                  <div className="col col-12 text-end mt-2">
                    <button
                      className="border-0 bg-transparent"
                      id="fav"
                      title="Add to favorites"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="currentColor"
                        className="bi bi-chat-heart-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15Zm0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                      </svg>
                    </button>
                  </div>

                  <div className="col-12 overflow-hidden w-100" style={{"height":"53vh"}}>
                    <img src={mainImage} alt="imagen" id="mainImage"
                      className="w-50 bg-white mx-auto d-block"/>
                  </div>

                  <div className="row grid gap-2 ms-1 mx-1">
                    {
                      Images.length > 0
                        ? Images.map(diseño => (
                          <button className={`${Images.length===1?"col col-3":"col"} border-0 bg-transparent p-0`} key={diseño.id}>
                            <img
                              src={diseño.url}
                              style={{"height":"23vh"}}
                              alt="zapato"
                              className={`w-100 border border-4 rounded shadow-lg ${mainImage===diseño.url?"border-warning":"border-info"}`}
                              onClick={handleMainImage}
                            />
                          </button>
                        ))
                        : detail.id
                          ? setImages(detail.images) & setMainImage(detail.images[0].url)
                          : null
                    }

                  </div>
                </div>

                <div className="col col-5 pt-4">
                  <div className="row m-0 p-0">
                    <h3 className="text-light fs-2">$ {detail.price}</h3>
                    <p className="text-warning fs-3">Available: {stock}</p>
                  </div>

                  <div className="row text-white mt-3 ms-2">
                    <h3 className="mb-3 fs-4">Colors:</h3>
                    <div className="form-floating w-50 ms-5">
                      <select
                        className="form-select fw-bold"
                        name="colors"
                        value={colorSelect?colorSelect:detail.color}
                        onChange={handleColor}
                      >
                        {detailColor.length > 0 &&
                          detailColor.map((diseño) => (
                            <option key={diseño.id} value={diseño.color} className="fw-bold" id={diseño.id}>
                              {diseño.color.toUpperCase()}
                            </option>
                          ))}
                      </select>
                      <label
                        htmlFor="floatingSelect"
                        className="text-dark fs-5 ms-2 p-1 mt-1"
                      >
                        Select a color
                      </label>
                    </div>

                    <h3 className="mt-4 mb-3 fs-4">Sizes:</h3>
                    <div className="form-floating w-50 ms-5">
                      <select className="form-select fw-bold" name="size"
                        value={sizeSelect} onChange={handleSize}
                      >
                        {size.length > 0
                          ? size.map((talla) => (
                            <option key={talla.id} value={talla.size} className="fw-bold" id={talla.id}>
                              {talla.size}
                            </option>
                          ))
                          : detail.id
                            ? setSize(detail.stocks) & setStock(detail.stocks[0].amount)
                            : null
                        }
                      </select>
                      <label
                        htmlFor="floatingSelect"
                        className="text-dark fs-5 ms-2 p-1 mt-1"
                      >
                        Select a size
                      </label>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center mt-5 pt-4">
                    <button className="w-50 btn btn-outline-info fs-3 fw-bold">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
              <hr className="border border-2 border-secondary" />
              <div className="mt-5 pb-5">
                <h1 className="ms-3">About the product: </h1>
                <h3 className="ms-4 mt-4 mb-3 fs-4 text-info">
                  {detail.brand} - {detail.model}
                </h3>
                <p className="ms-5 mx-5 fs-3" style={{ textAlign: "justify" }}>
                  {detail.description}
                </p>
              </div>
            </div>
            <hr className="border border-2 border-secondary" />
            <div className="container mt-5 mb-5 w-75">
              <div className="row">
                <h1 className="text-center text-info">Related products</h1>
              </div>
              <div className="row text-center m-0 mt-5 grid gap-5">
                <button
                  className="col border-0 bg-transparent p-0 w-50"
                  id="relatedProduct"
                >
                  <img
                    src={data.data[2].image.small}
                    alt="foto"
                    className="w-100 border border-5 border-info shadow-lg rounded rounded-3"
                  />
                </button>
                <button
                  className="col border-0 bg-transparent p-0"
                  id="relatedProduct"
                >
                  <img
                    src={data.data[3].image.small}
                    alt="foto"
                    className="w-100 border border-5 border-info shadow-lg rounded rounded-3"
                  />
                </button>
                <button
                  className="col border-0 bg-transparent p-0"
                  id="relatedProduct"
                >
                  <img
                    src={data.data[4].image.small}
                    alt="foto"
                    className="w-100 border border-5 border-info shadow-lg rounded rounded-3"
                  />
                </button>
              </div>
            </div>
          </>
        )}
    </div>
  );
}

export default Details;
