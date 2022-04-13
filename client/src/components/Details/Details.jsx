//import { useParams } from "react-router-dom"
import { useState } from "react";
import style from "./Details.module.css"
import { data } from "../data"

function Details() {
  const [colorSelect, setColorSelect] = useState()
  const [sizeSelect, setSizeSelect] = useState()
  //const { id } = useParams()
  const details = {
    "id": "24467d63-43b6-40f9-a009-3b486db9d519",
    "sku": "A01231F",
    "brand": "Converse",
    "size": [36, 37, 38, 39, 40],
    "name": "Converse Chuck Taylor All-Star Pokemon Pikachu (TD)",
    "colorway": ["yellow", "white"],
    "gender": "toddler",
    "silhouette": "Chuck Taylor All Star",
    "releaseYear": "2022",
    "releaseDate": "2022-12-07",
    "retailPrice": 40,
    "estimatedMarketValue": 48,
    "story": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus ratione ducimus totam excepturi. Illo dolor totam in provident alias, sequi libero similique maxime vitae delectus numquam porro ab illum! Nisi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat autem recusandae at optio delectus eos asperiores, inventore facilis quae error ipsum cupiditate fugit soluta incidunt neque alias in? Ipsam, ipsum.",
    "image": {
      "360": [],
      "original": "https://image.goat.com/attachments/product_template_pictures/images/067/561/185/original/887470_00.png.png",
      "small": "https://image.goat.com/750/attachments/product_template_pictures/images/067/561/185/original/887470_00.png.png",
      "thumbnail": "https://image.goat.com/375/attachments/product_template_pictures/images/067/561/185/original/887470_00.png.png"
    }
  }
  return (
    <div className="bg-light">
      <div className="container mt-5 mb-5 rounded-3 shadow-lg ">
        <div className="row pt-4 pb-4 bg-white">
          <h1 className="text-info text-center">{details.name}</h1>
        </div>

        <div className="row overflow-hidden bg-secondary">

          <div className="col bg-white">
            <div className="col col-12 text-end mt-2">
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-chat-heart-fill" viewBox="0 0 16 16">
                  <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15Zm0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                </svg>
              </a>
            </div>
            <img src={details.image.original} alt="imagen" className="col-12 w-50 bg-white mx-auto d-block" />

            <div className="row grid gap-2">
              <div className="col">
                <a href="#">
                  <img src={details.image.thumbnail} alt="zapato" className="w-100 border border-info border-4 rounded shadow-lg" />
                </a>
              </div>
              <div className="col">
                <a href="#">
                  <img src={details.image.small} alt="zapato" className="w-100 border border-info border-4 rounded shadow-lg" />
                </a>
              </div>
              <div className="col">
                <a href="#">
                  <img src={details.image.thumbnail} alt="zapato" className="w-100 border border-info border-4 
                  rounded shadow-lg" />
                </a>
              </div>
              <div className="col">
                <a href="#">
                  <img src={details.image.thumbnail} alt="zapato" className="w-100 border border-info border-4 rounded shadow-lg" />
                </a>
              </div>
            </div>
          </div>

          <div className="col col-5 pt-4">
            <div className="row m-0 p-0">
              <h3 className="text-light fs-2">$ {details.retailPrice}</h3>
              <p className="text-warning fs-3">Available: 40</p>
            </div>

            <div className="row text-white mt-3 ms-2">
              <h3 className="mb-3 fs-4">Colors:</h3>
              <div className="form-floating w-50 ms-5">
                <select className="form-select fw-bold"
                  name="colors" value={colorSelect} onChange={(e) => setColorSelect(e.target.value)}>
                  {details.colorway.map((color, index) => <option key={index} value={color} className="fw-bold">{color.toUpperCase()}</option>)}
                </select>
                <label htmlFor="floatingSelect" className="text-dark fs-5 ms-2 p-1 mt-1" >Select a color</label>
              </div>

              <h3 className="mt-4 mb-3 fs-4">Sizes:</h3>
              <div className="form-floating w-50 ms-5">
                <select className="form-select fw-bold"
                  name="size" value={sizeSelect} onChange={(e) => setSizeSelect(e.target.value)}>
                  {details.size.map((s, index) => <option key={index} value={s} className="fw-bold">{s}</option>)}
                </select>
                <label htmlFor="floatingSelect" className="text-dark fs-5 ms-2 p-1 mt-1" >Select a size</label>
              </div>
            </div>
            <div className="row d-flex justify-content-center mt-5 pt-4">
              <button className="w-50 btn btn-outline-info fs-3">ADD TO CART</button>
            </div>

          </div>
        </div>
        <hr className="border border-2 border-secondary" />
        <div className="mt-5 pb-5">
          <h1 className="ms-3">About the product: </h1>
          <h3 className="ms-5 mt-4 mb-3 fs-4 text-info">{details.brand} - {details.sku}</h3>
          <p className="ms-5 mx-5 fs-3" style={{ "textAlign": "justify" }}>{details.story}</p>

        </div>
      </div>
      <hr className="border border-2 border-secondary" />

      <div className="container mt-5 mb-5">
        <div className="row">
          <h1 className="text-center text-info">Related products</h1>
        </div>
        <div className="row text-center m-0 mt-5 grid gap-5">
          <a href="#" className="col">
            <img src={data.data[2].image.small} alt="foto" className="w-75 border border-5 border-info shadow-lg rounded rounded-3" />
          </a>
          <a href="#" className="col">
            <img src={data.data[3].image.small} alt="foto" className="w-75 border border-5 border-info shadow-lg rounded rounded-3" />
          </a>
          <a href="#" className="col">
            <img src={data.data[4].image.small} alt="foto" className="w-75 border border-5 border-info shadow-lg rounded rounded-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Details;