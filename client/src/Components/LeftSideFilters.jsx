import "../Css/leftside.scss";
import Checkbox from "./Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllCategories, getAllGenders} from "../redux/actions/getAllUtils";
import MultiRangeSlider from "multi-range-slider-react";
import leftSideFilter from "../redux/actions/leftSideFilter";
const colors = [
  "Black",
  "White",
  "Brown",
  "Purple",
  "Orange",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Gray",
  "Beige",
  "Pink",
];
const brands = [
  "Adidas",
  "Rebook",
  "Salomon",
  "Fila",
  "Topper",
  "Vans",
  "Nike",
  "Jaguar",
  "Gucci",
  "Puma",
  "Jordan",
];
const LeftSideFilters = () => {
  const {categories, genders} = useSelector((state) => state);
  const dispatch = useDispatch();
  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(75);
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllGenders());
  }, [dispatch]);
  return (
    <div className="left-side-container">
      <div className="gender-filter">
        <h4>Gender</h4>
        {genders.length !== 0 &&
          genders.map((g, i) => <Checkbox key={i} data={g.gender} />)}
      </div>

      <div className="price-filter">
        <h4>Price</h4>
        <MultiRangeSlider
          min={0}
          max={100}
          step={5}
          ruler={true}
          label={true}
          preventWheel={false}
          minValue={minValue}
          maxValue={maxValue}
          onInput={(e) => {
            handleInput(e);
          }}
        />
      </div>

      <div className="offer-filter">
        <h4>Sale</h4>
        <Checkbox data={"On sale"} />
      </div>

      <div className="size-filter">
        <h4>Size</h4>
        <div className="hijos">
          <ul>
            <li>Male</li>
            <li>Male</li>
            <li>Male</li>
          </ul>
        </div>
      </div>

      <div className="category-filter">
        <h4>Category</h4>
        {categories.length !== 0 &&
          categories.map((c, i) => <Checkbox key={i} data={c.category} />)}
      </div>

      <div className="brand-filter">
        <h4>Brand</h4>
        {brands.map((b, i) => (
          <Checkbox key={i} data={b} />
        ))}
      </div>

      <div className="color-filter">
        <h4>Colors</h4>
        <div className="colors">
          {colors.map((c, i) => {
            return (
              <div
                onClick={() => {
                  dispatch(leftSideFilter("color", c));
                }}
                key={i}
                style={{"--c": c}}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeftSideFilters;
