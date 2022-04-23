import {useState, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {postProduct} from "../../redux/actions/productsAdmin";
import "../../Css/Create-new.css";
import Input from "./Input";

const CreateNew = ({funcEnviar}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    brand: "",
    category: "",
    color: "",
    gender: "",
    images: "http://",
    model: "",
    price: 0,
    sale: 0,
    stocks: [], //{amount:0, id:#,productId:#id,size:0}
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
    if ( Object.values(errors).some((e) => e.length && e !== "Can be Null") || Object.values(data).some((d) => d === ""))return;
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
  //Number(string)
  const handleInputChange = (e) => {
    if (e.target.name === "price" || e.target.name === "sale") {
      setData({...data, [e.target.name]: Number(e.target.value)});
    }
    if (e.target.name === "stocks")
      setData({...data, stocks: [...data.stocks, e.target.value]});
    else setData({...data, [e.target.name]: e.target.value});
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

  return (
    <div className="create-container">
      <div className="form-container">
        {/*  <h1 style={{color: "white"}}>Create new pokemon</h1>*/}
        <form onSubmit={handleSubmit}>
          {Object.keys(data).map((input, i) => {
            return (
              <Input
                key={i}
                name={input}
                setData={handleInputChange}
                error={errors[input]}
              />
            );
          })}
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default CreateNew;
