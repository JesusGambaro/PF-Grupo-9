import {useState, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {postProduct} from "../../redux/actions/productsAdmin";
import "../../Css/ShoeForm.scss";
import Input from "./Input";
import Selection from "./Selection";
import {useSelector} from "react-redux";
import {brands, colors, sizes} from "../data";

const ShoeForm = ({funcEnviar}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    model: "", //input
    brand: "", //input
    category: "", //select
    gender: "", //select
    color: "", //select
    description: "", //textarea
    price: 0, //input
    sale: 0, //input
    stock: [], //size -> select | amount -> input
    images: [], //input
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({
      ...errors,
      model: validation(data.model, "model"),
      brand: validation(data.brand, "brand"),
      category: validation(data.category, "category"),
      color: validation(data.color, "color"),
      gender: validation(data.gender, "gender"),
      price: validation(data.price, "price"),
      sale: validation(data.sale, "sale"),
      images: validation(data.images, "images"),
      stocks: data.stocks.length < 1 ? "Almost 1 needed" : "",
    });
    if (
      Object.values(errors).some((e) => e.length && e !== "Can be Null") ||
      Object.values(data).some((d) => d === "")
    )
      return;
    //dispatch(addPokemon(data));
    //navigate("/home");
    funcEnviar("Desactive");
  };
  const validation = (param, type) => {
    if (!param) return type !== "images" ? "Is required" : "Can be Null";

    switch (type) {
      case "images":
        return !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
          param
        )
          ? "Insert a valid URL"
          : "Can be Null";
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
      default:
        return !/^[a-zA-Zs]*$/.test(param)
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
      setData({...data, [e.target.name]: Number(e.target.value)});
    } else setData({...data, [e.target.name]: e.target.value});
    setErrors({
      ...errors,
      [e.target.name]: validation(e.target.value, e.target.name),
    });
  };

  const initialMount = useRef(true);
  useEffect(() => {
    if (initialMount.current) initialMount.current = false;
    else
      setErrors({
        ...errors,
        stock: data.stocks.length < 1 ? "Almost 1 needed" : "",
      });
  }, [data.stocks]);
  const {categories, genders} = useSelector((state) => state.root);
  const handleSelectChange = (e) => {
    if (!data.gender.length || data.category.length)
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    setColor(e.target.value);
  };
  const [ImageURL, setImageURL] = useState("");
  const deleteImage = (img) => {
    setData({...data, images: data.images.filter((i) => i !== img)});
  };

  const handleImagesChange = (img) => {
    if (data.images.length < 4 && data.images.indexOf(img) < 0)
      setData({...data, images: [...data.images, img]});
    setErrors({
      ...errors,
      images: validation(img, "images"),
    });
  };
  const [color, setColor] = useState("white");
  return (
    <div className="create-container">
      <div className="form-container">
        <h2>
          Add new shoe <button className="save-btn">Save</button>
        </h2>

        <form action="">
          <div className="leftside">
            <div className="model">
              <h4>Model</h4>
              <Input
                name={"model"}
                error={errors[data.model]}
                setData={setData}
              />
            </div>
            <div className="category-gender">
              <span>
                <h4>Category</h4>
                {categories.length && (
                  <Selection
                    options={categories.map((e) => Object.values(e)[0])}
                    type={"category"}
                    handleChange={handleSelectChange}
                  />
                )}
              </span>
              <span>
                <h4>Gender</h4>
                {genders.length && (
                  <Selection
                    options={genders.map((e) => Object.values(e)[0])}
                    type={"gender"}
                    handleChange={handleSelectChange}
                  />
                )}
              </span>
            </div>
            <div className="brands">
              <h4>Brand</h4>
              <Selection
                options={brands}
                type={"brand"}
                handleChange={handleSelectChange}
              />
            </div>
            <div className="description">
              <h4>Description</h4>
              <textarea className="txtarea" cols="30" rows="10"></textarea>
            </div>
          </div>
          <div className="rightside">
            <div className="images">
              <h4>Images</h4>
              <div className="images-container">
                {data.images.map((img, i) => {
                  console.log(img)
                  if (!img) {
                    return <div className="imagent"></div>;
                  }
                  return (
                    <div className="image">
                      <img src={img} alt={"Img N°" + i} />
                      <button onClick={() => deleteImage(img)}>X</button>
                    </div>
                  );
                })}
              </div>
              <button>Add image</button>
              <div className="add-images">
                <input
                  type="text"
                  placeholder="Image URL"
                  onChange={(e) => setImageURL(e.target.value)}
                />
                <button onClick={() => handleImagesChange(ImageURL)}>
                  Add image
                </button>
              </div>
            </div>
            <div className="stock">
              <span>
                <h4>Size</h4>
                <Selection
                  options={sizes}
                  type={"size"}
                  handleChange={handleSelectChange}
                />
              </span>
              <span>
                <h4>Amount</h4>
                <Input
                  name={"amount"}
                  error={errors[data.stock.amount]}
                  setData={setData}
                />
              </span>
            </div>
            <div className="color">
              <h4>Color</h4>
              <span>
                <Selection
                  options={colors}
                  type={"color"}
                  handleChange={handleSelectChange}
                />
                <div className="color-show" style={{"--c": color}}></div>
              </span>
              {!data.stock.length && (
                <span className="stock-container">
                  {data.stock.map((stock) => {
                    return (
                      <div className="stock-card">
                        <p>{stock.size}</p>
                        <p>{stock.amount}</p>
                        <button>X</button>
                      </div>
                    );
                  })}
                </span>
              )}
            </div>
            <div className="price-sale">
              <span>
                <h4>Price</h4>
                <Input
                  name={"price"}
                  error={errors[data.price]}
                  setData={setData}
                />
              </span>
              <span>
                <h4>Sale</h4>
                <Input
                  name={"sale"}
                  error={errors[data.sale]}
                  setData={setData}
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
