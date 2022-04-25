import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editShoe, postProduct } from "../../redux/actions/productsAdmin";
import "../../Css/ShoeForm.scss";
import Input from "./Input";
import Selection from "./Selection";
import { useSelector } from "react-redux";
import { brands, colors, sizes } from "../data";
import bringAllData from "../../redux/actions/bringAllData";

const ShoeForm = ({ handleShoeDialog, shoeObject }) => {
  const { role } = useSelector((state) => state.root);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [stock, setStock] = useState({ amount: 0, size: 0 });
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
          images: [{ url: "" }, { url: "" }, { url: "" }, { url: "" }],
        }
  );
  const handleSubmit = () => {
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
      stock: data.stock && data.stock.length < 1 ? "Almost 1 stock needed" : "",
    });
    if (
      Object.values(errors).some((e) => e.length && e !== "Can't be Null") ||
      Object.values(data).some((d) => d === "")
    )
      return;
    if (role.admin) {
      if (shoeObject) {
        dispatch(
          editShoe(window.localStorage.getItem("token"), {
            ...data,
            id: shoeObject.id,
          })
        );
        dispatch(bringAllData(true));
      } else dispatch(postProduct(window.localStorage.getItem("token"), data));
    } else if (role.admin === false) {
      navigate("/home");
    }
    //navigate("/home");
    handleShoeDialog();
  };
  const validation = (param, type) => {
    console.log("sOY LOS PARAMS=>>>", param, "<====>", type);
    if (!param || param === "")
      return type !== "images" ? "Is required" : "Can't be Null";
    switch (type) {
      case "size":
        if (
          Array.from({ length: 14 }, (_, i) => 7 + i).indexOf(Number(param)) < 0
        ) {
          return "Must be a size from 7 to 20";
        }
        break;
      case "amount":
        if (!/^[0-9]+$/.test(param)) {
          return "Must be just digits";
        } else if (param > 1000) return "Can't exceeds 1000";
        break;
      case "images":
        let notNull = true;
        if (param.every((e) => e.url === "" || param.length < 1))
          notNull = false;
        return notNull ? "" : "Can't be Null";
      case "imageUrl":
        return !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
          param
        )
          ? "Insert a valid URL"
          : "";
      case "price":
        if (!/^[0-9]+$/.test(param)) {
          return "Must be just digits";
        } else if (param > 100000) return "Can't exceeds 100000";
        break;
      case "sale":
        if (!/^[0-9]+$/.test(param)) {
          return "Must be just digits";
        } else if (param > 99) return "Can't exceeds 99%";
        break;
      case "description":
        return param.length < 3
          ? "Minimum length 3"
          : param.length > 200
          ? "Maximum length 200"
          : "";
      default:
        return !/^[A-Za-z0-9\s]+$/g.test(param)
          ? "Must be just characters"
          : param.length < 3
          ? "Minimum length 3"
          : param.length > 20
          ? "Maximum length 20"
          : "";
    }
    return "";
  };
  const handleInputChange = (e) => {
    if (e.target.name === "price" || e.target.name === "sale") {
      setData({ ...data, [e.target.name]: Number(e.target.value) });
    } else if (e.target.name === "amount")
      setStock({ ...stock, [e.target.name]: e.target.value });
    else setData({ ...data, [e.target.name]: e.target.value });

    setErrors({
      ...errors,
      [e.target.name]: validation(e.target.value, e.target.name),
    });
  };

  const { categories, genders } = useSelector((state) => state.root);
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
  const [addImgDialog, setAddImgDialog] = useState({
    on: false,
    pos: 0,
    url: "",
    error: "",
  });
  const deleteImage = (img) => {
    setData({
      ...data,
      images: data.images.map((i) => (i.url === img ? "" : i)),
    });
  };

  const handleImagesChange = () => {
    let repetido;
    if (!addImgDialog.error.length && addImgDialog.url.length) {
      
      data.images.map((e) => {
        
        if (e.url === addImgDialog.url) {
          //console.log("SOY LAS IMAGENES: ", data.images);
          repetido = true;
        }
      });
      !repetido &&
        setData({
          ...data,
          images: data.images.map((e, i) => {
            return i === addImgDialog.pos ? { url: addImgDialog.url } : e;
          }),
        });
    }

    if (!addImgDialog.error.length && addImgDialog.url.length && !repetido) {
      setAddImgDialog({ ...addImgDialog, on: false, error: "" });
    }else if(repetido){
      setAddImgDialog({ ...addImgDialog,on: true, error: "Can't repeat images" });
    }
  };
  const [color, setColor] = useState(shoeObject ? shoeObject.color : "white");
  const deleteStock = (size) => {
    setData({ ...data, stock: data.stock.filter((s) => s.size !== size) });
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
        stock: [...data.stock, { amount: stock.amount, size: stock.size }],
      });
    }
    setErrors({
      ...errors,
      size: validation(stock.size, "size"),
      amount: validation(stock.amount, "amount"),
      stock: data.stock.length < 1 ? "Almost 1 stock needed" : "",
    });
  };
  const initialMount = useRef(true);
  useEffect(() => {
    if (initialMount.current) initialMount.current = false;
    else {
      setErrors({
        ...errors,
        stock: data.stock.length < 1 ? "Almost 1 stock needed" : "",
        amount: validation(stock.amount, "amount"),
        size: validation(stock.size, "size"),
      });
    }
  }, [stock.amount, stock.size]);
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
                    options={categories.map((e) => Object.values(e)[0])}
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
                  setData({ ...data, description: e.target.value });
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
                      style={
                        img.url ? { backgroundImage: `url(${img.url})` } : {}
                      }
                    >
                      {img.url && (
                        <button
                          type="button"
                          className="delete-image-btn"
                          onClick={() => deleteImage(img.url)}
                        >
                          <i className="bi bi-x-circle-fill"></i>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setAddImgDialog({
                            ...addImgDialog,
                            on: true,
                            pos: i,
                          })
                        }
                      >
                        <i className="bi bi-plus-circle-fill"></i>Add image
                      </button>
                    </div>
                  );
                })}
              </div>
              {addImgDialog.on && (
                <div className="add-images">
                  <button
                    onClick={() =>
                      setAddImgDialog({
                        ...addImgDialog,
                        on: false,
                        url: "",
                        error: " ",
                      })
                    }
                  >
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                  <span>
                    <input
                      type="text"
                      placeholder="Image URL"
                      onChange={(e) => {
                        setAddImgDialog({
                          ...addImgDialog,
                          url: e.target.value,
                          error: validation(e.target.value, "imageUrl"),
                        });
                      }}
                    />
                    <button type="button" onClick={() => handleImagesChange()}>
                      Add image
                    </button>
                  </span>
                  <p className="error-msg">{addImgDialog.error}</p>
                </div>
              )}
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
                        setStock({ ...stock, size: e.target.value })
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
                  <h4 className="input-name">Color</h4>
                  <span>
                    <Selection
                      options={colors}
                      type={"color"}
                      handleChange={handleSelectChange}
                      value={data.color}
                    />
                    <div className="color-show" style={{ "--c": color }}></div>
                  </span>
                </div>
              </div>
              <div className="stock-cards-container">
                {errors.stock ? (
                  <p style={{ color: "rgb(255, 145, 0)", fontSize: "large" }}>
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
                  Price <p>{errors.price}</p>{" "}
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
