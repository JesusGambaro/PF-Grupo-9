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
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
    sprites: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({
      ...errors,
      name: validation(data.name, "name"),
      hp: validation(data.hp),
      attack: validation(data.attack),
      defense: validation(data.defense),
      speed: validation(data.speed),
      height: validation(data.height),
      weight: validation(data.weight),
      types: data.types.length < 1 ? "Almost 1 needed" : "",
    });

    if (
      Object.values(errors).some((e) => e.length) ||
      Object.values(data)
        .slice(0, 8)
        .some((d) => d === "" || !d.length)
    )
      return;

    dispatch(addPokemon(data));
    navigate("/home");
  };

  const validation = (param, type) => {
    if (!param) return type !== "sprites" ? "Is required" : "";

    switch (type) {
      case "sprites":
        return !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
          param
        )
          ? "Insert a valid URL"
          : "";
      case "name":
        return !/^[a-zA-Zs]*$/.test(param)
          ? "Must be just characters"
          : param.length < 3
          ? "Minimum length 3"
          : param.length > 10
          ? "Maximum length 10"
          : "";
      default:
        if (!/^[0-9]+$/.test(param)) {
          return "Must be just digits";
        } else if (param > 150) return "Can't exceeds 150";
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
  const handleTypesChange = (e) => {
    if (data.types.length < 2 && data.types.indexOf(e.target.value) < 0)
      setData({...data, types: [...data.types, e.target.value]});
  };

  const handleDeleteType = (type) => {
    setData({...data, types: data.types.filter((t) => t !== type)});
  };

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
          <div className="types">
            <Types
              handleChange={handleTypesChange}
              disable={data.types.length >= 2}
            />
            <div className="selected-types">
              {data.types.map((type, i) => {
                return (
                  <span
                    key={i}
                    className="type"
                    style={{"--i": typesColors[type]}}
                  >
                    {type.charAt(0).toUpperCase() + type.substring(1)}
                    <button
                      className="delete-type"
                      type="button"
                      onClick={() => handleDeleteType(type)}
                    >
                      X
                    </button>
                  </span>
                );
              })}
              {errors.types && <p>&#9888; {errors.types}</p>}
            </div>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default CreateNew;
