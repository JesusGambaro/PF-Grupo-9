import {useState, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {editShoe, postProduct} from "../../redux/actions/productsAdmin";
import "../../Css/ShoeForm.scss";
import Input from "./Input";
import Selection from "./Selection";
import {useSelector} from "react-redux";
import {brands, colors, sizes, categories} from "../data";
import validation from "./validation.js";
import bringAllData from "../../redux/actions/bringAllData";
const ShoeForm = ({handleShoeDialog, shoeObject}) => {
  const {role} = useSelector((state) => state.root);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [stock, setStock] = useState({amount: 0, size: 0});
  const [deletedImages, setDeletedImages] = useState([]);
  if (shoeObject) {
    shoeObject = {
      ...shoeObject,
      images: new Array(4).fill("").map((_, i) => {
        return shoeObject?.images[i]?.url ? shoeObject?.images[i] : {url: ""};
      }),
    };
  }
  const [data, setData] = useState(
    shoeObject
      ? shoeObject
      : {
          model: "", //input
          brand: "", //input
          category: "", //select
          gender: "", //select
          color: "", //select
          description: "", //textarea
          price: 0, //input
          sale: 0, //input
          stock: [], //size -> select | amount -> input
          images: [
            {url: "", image: ""},
            {url: "", image: ""},
            {url: "", image: ""},
            {url: "", image: ""},
          ],
        }
  );
  const handleSubmit = async () => {
    setErrors({
      ...errors,
      model: validation(data.model, "model"),
      category: validation(data.category, "category"),
      gender: validation(data.gender, "gender"),
      brand: validation(data.brand, "brand"),
      description: validation(data.description, "description"),
      color: validation(data.color, "color"),
      price: validation(data.price, "price"),
      sale: validation(data.sale, "sale"),
      images: validation(data.images, "images"),
      stock: validation(data.stock, "stock"),
    });
    if (
      Object.values(errors).some((e) => e.length) ||
      Object.values(data).some((d) => d === "" || d.length < 1) ||
      data.images.every((i) => i.url === "")
    )
      return;
    if (role.admin) {
      if (shoeObject) {
        const formData = new FormData();
        Object.keys(data).forEach((param) => {
          if (param === "stock") {
            formData.append(param, JSON.stringify(data[param]));
          } else if (param !== "images") formData.append(param, data[param]);
          else {
            /*formData.append(
              "images",
              data[param].map((img) => (!img.form ? img.image : ""))
            );
            else formData.append(param, data[param].map(img=>img.image)); */
            data[param].forEach((img, i) => {
              if (img.image) formData.append("image " + i, img.image);
            });
          }
        });
        formData.append("deletedImages", JSON.stringify(deletedImages));
        dispatch(
          editShoe(
            window.localStorage.getItem("token"),
            data,
            formData,
            shoeObject.id
          )
        );
        dispatch(bringAllData(true));
      } else {
        const formData = new FormData();
        Object.keys(data).forEach((param) => {
          if (param === "stock") {
            formData.append(param, JSON.stringify(data[param]));
          } else if (param !== "images") formData.append(param, data[param]);
          else {
            data[param].forEach((img, i) => {
              formData.append("image " + i, img.image);
            });
          }
          //else formData.append(param, data[param].map(img=>img.image));
        });
        dispatch(
          postProduct(window.localStorage.getItem("token"), data, formData)
        );
      }
    } else if (role.admin === false) {
      navigate("/home");
    }
    //navigate("/home");
    handleShoeDialog();
  };

  const handleInputChange = (e) => {
    if (e.target.name === "price" || e.target.name === "sale") {
      setData({...data, [e.target.name]: Number(e.target.value)});
    } else if (e.target.name === "amount")
      setStock({...stock, [e.target.name]: e.target.value});
    else setData({...data, [e.target.name]: e.target.value});

    setErrors({
      ...errors,
      [e.target.name]: validation(e.target.value, e.target.name),
    });
  };

  const {genders} = useSelector((state) => state.root);
  const handleSelectChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setColor(e.target.value);
    setErrors({
      ...errors,
      [e.target.name]: validation(e.target.value, e.target.name),
    });
  };

  const [color, setColor] = useState(shoeObject ? shoeObject.color : "white");
  const deleteStock = (size) => {
    setData({...data, stock: data.stock.filter((s) => s.size !== size)});
  };
  const handleStock = () => {
    if (
      data.stock.length < 6 &&
      errors.size === "" &&
      errors.amount === "" &&
      !data.stock.some((el) => el.size === stock.size)
    ) {
      setData({
        ...data,
        stock: [...data.stock, {amount: stock.amount, size: stock.size}],
      });
    }
    setErrors({
      ...errors,
      size: validation(stock.size, "size"),
      amount: validation(stock.amount, "amount"),
      stock: validation(data.stock, "stock"),
    });
  };
  const initialMount = useRef(true);
  useEffect(() => {
    if (initialMount.current) initialMount.current = false;
    else {
      setErrors({
        ...errors,
        stock: validation(data.stock, "stock"),
        amount: validation(stock.amount, "amount"),
        size: validation(stock.size, "size"),
      });
    }
  }, [stock.amount, stock.size, data.stock]);

  const deleteImage = (img) => {
    setDeletedImages([
      ...deletedImages,
      data.images.find((i) => i.url === img),
    ]);
    setData({
      ...data,
      images: data.images.map((i) => (i.url === img ? {url: "", form: ""} : i)),
    });
  };
  const handleFileInput = async (e, index) => {
    setData({
      ...data,
      images: data.images.map((img, i) => {
        return i === index
          ? {
              url: URL.createObjectURL(e.target.files[0]),
              image: e.target.files[0],
            }
          : img;
      }),
    });
  };

  return (
    <div className="create-container">
      <div className="form-container">
        <h2>
          Add new shoe
          <span>
            <button onClick={() => handleShoeDialog()}>
              <i className="bi bi-x-circle-fill"></i>Cancel
            </button>
            <button className="save-btn" onClick={handleSubmit}>
              <i className="bi bi-upload"></i>Save
            </button>
          </span>
        </h2>
        <form action="">
          <div className="leftside">
            <div className="model">
              <h4 className="input-name">
                Model <p>{errors.model}</p>
              </h4>
              <Input
                name={"model"}
                error={errors[data.model]}
                setData={handleInputChange}
                value={data.model}
              />
            </div>
            <div className="category-gender">
              <span>
                <h4 className="input-name">
                  Category <p>{errors.category}</p>
                </h4>
                {categories.length && (
                  <Selection
                    options={categories}
                    type={"category"}
                    handleChange={handleSelectChange}
                    value={data.category}
                  />
                )}
              </span>
              <span>
                <h4 className="input-name">
                  Gender <p>{errors.gender}</p>
                </h4>
                {genders.length && (
                  <Selection
                    options={genders.map((e) => Object.values(e)[0])}
                    type={"gender"}
                    handleChange={handleSelectChange}
                    value={data.gender}
                  />
                )}
              </span>
            </div>
            <div className="brands">
              <h4 className="input-name">
                Brand <p>{errors.brand}</p>
              </h4>
              <Selection
                options={brands}
                type={"brand"}
                handleChange={handleSelectChange}
                value={data.brand}
              />
            </div>
            <div className="description">
              <h4 className="input-name">
                Description <p>{errors.description}</p>
              </h4>
              <textarea
                className="txtarea"
                cols="30"
                rows="10"
                name="description"
                onChange={(e) => {
                  setData({...data, description: e.target.value});
                  setErrors({
                    ...errors,
                    description: validation(e.target.value, e.target.name),
                  });
                }}
                defaultValue={data.description}
              ></textarea>
            </div>
          </div>
          <div className="rightside">
            {/* --------------------------------- IMAGES --------------------------------- */}
            <div className="images">
              <h4 className="input-name">
                Images <p>{errors.images}</p>
              </h4>
              <div className="images-container">
                {data.images.map((img, i) => {
                  return (
                    <div
                      className={img.url ? "imagent show" : "imagent"}
                      key={i}
                      style={{backgroundImage: `url(${img.url})`}}
                    >
                      <button
                        type="button"
                        className="delete-image-btn"
                        onClick={() => deleteImage(img.url)}
                      >
                        <i className="bi bi-x-circle-fill"></i>
                      </button>
                      <label>
                        <input
                          type="file"
                          onChange={(e) => handleFileInput(e, i)}
                          accept="image/*"
                          placeholder="Choose Iamge"
                        />
                        <i className="bi bi-plus-circle-fill"></i>
                        <p>Add new image</p>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* --------------------------------- IMAGES --------------------------------- */}
            <div className="stock-color-section">
              <div className="stock-container">
                <div className="stock">
                  <span>
                    <h4 className="input-name">
                      Size<p>{errors.size}</p>
                    </h4>
                    <Selection
                      options={sizes}
                      type={"size"}
                      handleChange={(e) =>
                        setStock({...stock, size: e.target.value})
                      }
                    />
                  </span>
                  <span>
                    <h4 className="input-name">
                      Amount<p>{errors.amount}</p>
                    </h4>
                    <span>
                      <Input
                        name={"amount"}
                        error={errors["amount"]}
                        setData={handleInputChange}
                      />
                      <button type="button" onClick={() => handleStock()}>
                        <i className="bi bi-save"></i>
                      </button>
                    </span>
                  </span>
                </div>
                <div className="color">
                  <h4 className="input-name">
                    Color<p>{errors.color}</p>
                  </h4>
                  <span>
                    <Selection
                      options={colors}
                      type={"color"}
                      handleChange={handleSelectChange}
                      value={data.color}
                    />
                    <div className="color-show" style={{"--c": color}}></div>
                  </span>
                </div>
              </div>
              <div className="stock-cards-container">
                {errors.stock ? (
                  <p style={{color: "rgb(255, 145, 0)", fontSize: "large"}}>
                    {errors.stock}
                  </p>
                ) : (
                  data.stock &&
                  data.stock.length > 0 && (
                    <div className="stocks-container">
                      {data.stock.map((stock, i) => {
                        return (
                          <div className="stock-card" key={i}>
                            <p>Size {stock.size}</p>
                            <div className="line-divisor"></div>
                            <p>Amount {stock.amount}</p>
                            <button
                              type="button"
                              onClick={() => {
                                deleteStock(stock.size);
                              }}
                            >
                              <i className="bi bi-x-circle-fill"></i>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="price-sale">
              <span>
                <h4 className="input-name">
                  Price <p>{errors.price}</p>
                </h4>
                <Input
                  name={"price"}
                  error={errors[data.price]}
                  setData={handleInputChange}
                  value={data.price > 0 && data.price}
                />
              </span>
              <span>
                <h4 className="input-name">
                  Sale <p>{errors.sale}</p>
                </h4>
                <Input
                  name={"sale"}
                  error={errors[data.sale]}
                  setData={handleInputChange}
                  value={data.sale > 0 && data.sale}
                />
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShoeForm;
