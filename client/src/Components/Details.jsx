import "../Css/Details.css";
import Loading from "./Loading";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import bringAllData from "../redux/actions/bringAllData";
import {
  getDetail,
  getDetailColor,
  clearDetail,
} from "../redux/actions/getDetail";
import Swal from "sweetalert2";
import { addCart } from "../redux/actions/userCart";
import { addFav } from "../redux/actions/userFav";

function Details() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, model } = useParams();
  const { detail, loading, detailColor, allData } = useSelector(
    (state) => state.root
  );
  const token = window.localStorage.getItem("token");
  const [stock, setStock] = useState();
  const [size, setSize] = useState([]);
  const [Images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState();
  const [sizeSelect, setSizeSelect] = useState();
  const [colorSelect, setColorSelect] = useState();
  const [reload, setReload] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState([]);

  const handleMainImage = (e) => {
    setMainImage(e.target.src);
  };

  const handleColor = (e) => {
    setColorSelect(e.target.value);
    let index = e.target.selectedIndex;
    let identificador = e.target.options[index].id;

    const shoes = detailColor.find((detail) => detail.id == identificador);
    setImages(shoes.images);
    setMainImage(shoes.images[0].url);
    setSize(shoes.stocks);
    setStock(shoes.stocks[0].amount);
    setSizeSelect(shoes.stocks[0].size);
  };

  const handleSize = (e) => {
    setSizeSelect(e.target.value);
    let index = e.target.selectedIndex;
    let identificador = e.target.options[index].id;
    const stock = size.find((siz) => siz.id == identificador);
    setStock(stock.amount);
  };

  const handleReload = (id, model) => {
    navigate(`/home/${id}/${model}`);
    setReload(true);
  };

  const handleAddingCart = () => {
    if (token) {
      const sizeCart = sizeSelect ? parseInt(sizeSelect) : size[0].size;
      const productFound = detailColor.find((p) => p.color === colorSelect);
      const productId = productFound ? productFound.id : detail.id;
      const product = { productId, size: sizeCart };
      dispatch(addCart(token, product));
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Product added successfully",
        showConfirmButton: false,
        timer: 1250,
      });
    } else {
      Swal.fire({
        title: "You must login to add products to cart",
        text: "Do you want to login?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/home/login");
        }
      });
    }
  };

  const handleAddingFavCart = () => {
    if (token) {
      const sizeCart = sizeSelect ? parseInt(sizeSelect) : size[0].size;
      const productFound = detailColor.find((p) => p.color === colorSelect);
      const productId = productFound ? productFound.id : detail.id;
      const product = { productId, size: sizeCart };
      dispatch(addFav(token, product));
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Product added successfully",
        showConfirmButton: false,
        timer: 1250,
      });
    } else {
      Swal.fire({
        title: "You must log in to add favorite products",
        text: "Do you want to login?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/home/login");
        }
      });
    }
  };

  useEffect(() => {
    setReload(false);
    setImages([]);
    setColorSelect()
    setSizeSelect();
    setSize([]);
    setStock();

    dispatch(getDetail(id));
    dispatch(getDetailColor(model));

    if (allData.length > 3) {
      const numRandom = Math.round(Math.random() * (allData.length - 3) + 3);
      setRelatedProduct(allData.slice(numRandom - 3, numRandom));
    } else if (allData.length === 0) dispatch(bringAllData());
  }, [allData, reload, id, dispatch, model]);

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    return () => dispatch(clearDetail());
  }, [reload, dispatch]);

  return (
    <div className="w-100" style={{ marginTop: "4rem" }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container mt-5 mb-5 rounded-3 shadow-lg w-100">
            <div className="row pt-4 pb-4 bg-white">
              <h1 className="text-info text-center">
                {detail.brand} {detail.model}
              </h1>
            </div>

            <div className="row overflow-hidden bg-secondary h-auto">
              <div className="col-12 pb-5 bg-white col-lg pb-lg-0 ">
                <div className="col col-12 text-end mt-2">
                  <button
                    className="border-0 bg-transparent"
                    id="fav"
                    title="Add to favorites"
                    onClick={handleAddingFavCart}
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

                <div
                  className="col-12 overflow-hidden w-100"
                  id="mainImage"
                  style={{ height: "54vh" }}
                >
                  <img
                    src={mainImage}
                    alt="imagen"
                    id="mainImage"
                    className="bg-white mx-auto d-block"
                  />
                </div>

                <div className="row grid ms-1 mx-1">
                  {Images.length > 0
                    ? Images.map((diseño) => (
                      <button
                        className={`${Images.length === 1 ? "col col-3" : "col"
                          } border-0 bg-transparent p-0`}
                        key={diseño.id}
                      >
                        <img
                          src={diseño.url}
                          style={{ height: "18vh" }}
                          alt="zapato"
                          className={`border border-4 rounded shadow-lg ${mainImage === diseño.url
                              ? "border-warning"
                              : "border-info"
                            }`}
                          onClick={handleMainImage}
                          id={"images"}
                        />
                      </button>
                    ))
                    : detail.id
                      ? setImages(detail.images) &
                      setMainImage(detail.images[0].url)
                      : null}
                </div>
              </div>

              <div className="m-0 pb-3 col col-12 col-lg-5 pt-4 pb-lg-0">
                <div className="row m-0 p-0">
                  <h3 className="text-light fs-2">$ {detail.price}</h3>
                  <p className="text-warning fs-3">Stock: {stock}</p>
                </div>

                <div className="row text-white mt-3 ms-md-2 mt-md-1">
                  <div className="ms-1 col col-lg-12 ms-sm-3 p-0">
                    <h3 className="mb-3 fs-4">Colors:</h3>
                    <div
                      className="ms-0 form-floating ms-lg-5"
                      id="selectColor"
                    >
                      <select
                        className="form-select fw-bold"
                        name="colors"
                        value={colorSelect? colorSelect:detail.color }
                        onChange={handleColor}
                      >
                        {detailColor.length > 0 &&  detailColor.map((diseño) => (
                            <option
                              key={diseño.id}
                              value={diseño.color}
                              className="fw-bold"
                              id={diseño.id}
                            >
                              {diseño.color.toUpperCase()}
                            </option>
                          ))
                        }
                      </select>
                      <label
                        htmlFor="floatingSelect"
                        className="text-dark fs-5 ms-2 p-1 mt-1"
                      >
                        Select a color
                      </label>
                    </div>
                  </div>
                  <div className="col col-lg-12 ms-sm-3 p-0 ms-1">
                    <h3 className="mt-0 mt-lg-4 mb-3 fs-4 ">Sizes:</h3>
                    <div className="ms-0 form-floating ms-lg-5" id="selectSize">
                      <select
                        className="form-select fw-bold"
                        name="size"
                        value={sizeSelect}
                        onChange={handleSize}
                      >
                        {size.length > 0
                          ? size.map((talla) => (
                            <option
                              key={talla.id}
                              value={talla.size}
                              className="fw-bold"
                              id={talla.id}
                            >
                              {talla.size}
                            </option>
                          ))
                          : detail.id
                            ? setSize(detail.stocks) &
                            setStock(detail.stocks[0].amount)
                            : null}
                      </select>
                      <label
                        htmlFor="floatingSelect"
                        className="text-dark fs-5 ms-2 p-1 mt-1"
                      >
                        Select a size
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row mt-5 mb-4 d-flex justify-content-center mt-xl-4 pt-xl-4 mt-lg-3 pt-lg-3">
                  <button
                    className="w-50 btn btn-outline-info fs-4 fw-bold"
                    disabled={stock == 0}
                    onClick={handleAddingCart}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
            <hr className="border border-2 border-secondary" />
            <div className="mt-5 pb-5">
              <h1 className="ms-md-3">About the product: </h1>
              <h3 className="ms-md-4 mt-md-4 mb-3 fs-4 text-info">
                {detail.brand} - {detail.model}
              </h3>
              <p
                className="ms-1 mx-1 ms-md-5 mx-md-5 fs-3"
                style={{ textAlign: "justify" }}
              >
                {detail.description}
              </p>
            </div>
          </div>
          <hr className="border border-2 border-secondary" />
          <div className="container mt-5 mb-5" id="container">
            <div className="row">
              <h1 className="text-center text-info">More products</h1>
            </div>
            <div className="row text-center m-0 mt-5 pb-5 grid gap-3 gap-lg-5 justify-content-center">
              {relatedProduct &&
                relatedProduct.map((product) => (
                  <button
                    className="col-8 col-sm-7 col-lg border-0 bg-transparent p-0"
                    id="relatedProduct"
                    key={product.id}
                    onClick={() => handleReload(product.id, product.model)}
                  >
                    <img
                      src={product.images[0].url}
                      alt="foto"
                      className="w-100 border border-5 border-info shadow-lg rounded rounded-3"
                      style={{ height: "39vh" }}
                    />
                  </button>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Details;
