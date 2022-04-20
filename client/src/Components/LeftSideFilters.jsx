import "../Css/leftside.scss";
import Checkbox from "./Checkbox";
import {useDispatch, useSelector} from "react-redux";
import Filters from "./Filters";
import {useEffect, useState} from "react";
import {getAllCategories, getAllGenders} from "../redux/actions/getAllUtils";
import {leftSideFilter, deleteFilter} from "../redux/actions/leftSideFilter";
import MultiRangeSlider from "multi-range-slider-react";
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
  "Reebok",
  "Salomon",
  "Fila",
  "Topper",
  "Vans",
  "Converse",
  "Jaguar",
  "Gucci",
  "Puma",
  "Jordan",
  "Nike",
];
const size = [9, 10, 11, 12, 13, 14, 15, 16, 44];
const LeftSideFilters = () => {
  const {categories, genders, filters, genderActual} = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const [range, setRange] = useState({minValue: 2500, maxValue: 75000});
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllGenders());
  }, [dispatch]);

  const handleCheckChange = (e, filter, value) => {
    if (e.target.checked) {
      dispatch(leftSideFilter(filter, value));
    } else {
      dispatch(deleteFilter(filter.toLowerCase()));
      dispatch(leftSideFilter());
      e.target.checked = false;
    }
  };
  const handleInput = (e) => {
    setRange({minValue: e.minValue, maxValue: e.maxValue});
  };

  const handlePrice = (e) => {
    dispatch(range);
  };
  return (
    <div className="left-side-container">
      <Filters filters={filters} genderActual={genderActual} />
      <div className="gender-filter">
        <h4>Gender</h4>
        {genders.length !== 0 &&
          genders.map((g, i) => <Checkbox key={i} data={g.gender} />)}
      </div>

      <div className="price-filter">
        <h4>Price</h4>
        <MultiRangeSlider
          min={0}
          max={100000}
          step={10000}
          ruler={false}
          label={true}
          preventWheel={false}
          minValue={range.minValue}
          maxValue={range.maxValue}
          onInput={(e) => {
            handleInput(e);
          }}
        />
        <div className="prices-container">
          <span>
            Min
            <input
              type="number"
              value={range.minValue}
              onChange={(e) => setRange({...range, minValue: e.target.value})}
            />
          </span>
          <span>
            Max
            <input
              type="number"
              value={range.maxValue}
              onChange={(e) => setRange({...range, maxValue: e.target.value})}
            />
          </span>
          <button onClick={handlePrice}>
            <i class="bi bi-caret-right-fill"></i>
          </button>
        </div>
      </div>
      <div className="offer-filter">
        <h4>Sale</h4>
        <Checkbox
          data={"On sale"}
          change={(e) => handleCheckChange(e, "Sale", "On Sale")}
        />
      </div>

      <div className="size-filter">
        <h4>Size</h4>
        <div className="sizes-container">
          {size.map((s, i) => {
            return (
              <Checkbox
                key={i}
                change={(e) => handleCheckChange(e, "Size", s)}
                size={s}
                data={s}
              />
            );
          })}
        </div>
      </div>

      <div className="category-filter">
        <h4>Category</h4>
        {categories.length !== 0 &&
          categories.map((c, i) => (
            <Checkbox
              key={i}
              data={c.category}
              change={(e) => handleCheckChange(e, "category", c.category)}
            />
          ))}
      </div>

      <div className="brand-filter">
        <h4>Brand</h4>
        {brands.map((b, i) => (
          <Checkbox
            key={i}
            data={b}
            change={(e) => handleCheckChange(e, "brand", b)}
          />
        ))}
      </div>

      <div className="color-filter">
        <h4>Color</h4>
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
