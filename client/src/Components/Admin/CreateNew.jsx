import {useState, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {postProduct} from "../../redux/actions/productsAdmin";
import "../css/Create-new.css";
import Input from "./Input";

const CreateNew = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    brand: "",
    category: "",
    color: "",
    gender: "",
    images: "",
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
      brand: validation(data.brand),
      category: validation(data.category),
      color: validation(data.color),
      gender: validation(data.gender),
      price: validation(data.price),
      sale: validation(data.sale),
      images: validation(data.images),
      stocks: data.stocks.length < 1 ? "Almost 1 needed" : "",
    });

    if (
      Object.values(errors).some((e) => e.length) ||
      Object.values(data)
        .slice(0, 8)
        .some((d) => d === "" || !d.length)
    )
      return;

    dispatch(addPokemon(data));
    navigate("/home/admin/products");
  };

  const validation = (param, type) => {
    if (!param) return type !== "images" ? "Is required" : "";

    switch (type) {
      case "images":
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
    setData({...data, [e.target.name]: e.target.value});
    // if (e.target.name === "sprites") return;
    setErrors({
      ...errors,
      [e.target.name]: validation(e.target.value, e.target.name),
    });
  };
  //-------------TYPES-------------//
/*   const handleTypesChange = (e) => {
    if (data.types.length < 2 && data.types.indexOf(e.target.value) < 0)
      setData({...data, types: [...data.types, e.target.value]});
  };

  const handleDeleteType = (type) => {
    setData({...data, types: data.types.filter((t) => t !== type)});
  };
 */
  const initialMount = useRef(true);
  useEffect(() => {
    if (initialMount.current) initialMount.current = false;
    else
      setErrors({
        ...errors,
        types: data.types.length < 1 ? "Almost 1 needed" : "",
      });
  }, [data.types]);

  return (
    <div className="create-container">
      <div className="form-container">
        {/*  <h1 style={{color: "white"}}>Create new pokemon</h1>*/}
        <form onSubmit={handleSubmit}>
          {Object.keys(data).map((input, i) => {
            if (input === "types") return null;
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
