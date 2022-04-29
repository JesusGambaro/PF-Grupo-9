import "../Css/leftside.scss";
import Checkbox from "./Checkbox";
import {useDispatch, useSelector} from "react-redux";
import Filters from "./Filters";
import {useEffect, useState} from "react";
import {getAllCategories, getAllGenders} from "../redux/actions/getAllUtils";
import {leftSideFilter, deleteFilter} from "../redux/actions/leftSideFilter";
import MultiRangeSlider from "multi-range-slider-react";
import {brands, colors, sizes} from "./data";

const LeftSideFilters = () => {
  const {categories, genders, filters} = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const [range, setRange] = useState({minValue: 0, maxValue: 75000});
  const [checkeds, setCheckeds] = useState([]);
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllGenders());
    if (!filters.length) setCheckeds([]);
  }, [dispatch, filters.length]);

  const handleCheckChange = (e, filter, value) => {
    if (e.target.checked) {
      dispatch(leftSideFilter(filter, value));
    } else {
      dispatch(deleteFilter(filter.toLowerCase()));
      dispatch(leftSideFilter());
    }
  };
  const handleCheckSelect = (key) => {
    setCheckeds(checkeds.filter((select) => select !== key));
  };
  const handleCheckboxChange = (key) => {
    let sel = checkeds;
    let finded = checkeds.indexOf(key);
    if (finded > -1) {
      sel.splice(finded, 1);
    } else {
      sel.push(key);
    }
    setCheckeds(sel);
  };

  const handleInput = (e) => {
    setRange({minValue: e.minValue, maxValue: e.maxValue});
  };

  const handlePrice = (e) => {
    dispatch(leftSideFilter("price", range));
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [filters.length]);

  return (
    <div className="left-side-container">
      <Filters
        filters={filters}
        handleCheckSelect={(key) => handleCheckSelect(key)}
      />
      {/*<div className="gender-filter">
                <h4>Gender</h4>
                {genders.length !== 0 &&
                    genders.map((g, i) => <Checkbox key={i} data={g.gender}/>)}
                </div>*/}

      <div className="price-filter">
        <h4>Price</h4>
        <MultiRangeSlider
          min={0}
          max={75000}
          step={10000}
          ruler={false}
          label={true}
          preventWheel={true}
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
            <i className="bi bi-caret-right-fill"></i>
          </button>
        </div>
      </div>
      <div className="offer-filter">
        <h4>Sale</h4>
        <Checkbox
          data={"On sale"}
          change={(e) => {
            handleCheckChange(e, "Sale", "On Sale");
            handleCheckboxChange("On Sale");
          }}
          selected={checkeds.includes("On Sale")}
        />
      </div>

      <div className="size-filter">
        <h4>Size</h4>
        <div className="sizes-container">
          {sizes.map((s, i) => {
            return (
              <Checkbox
                key={i}
                change={(e) => {
                  handleCheckChange(e, "Size", s);
                  handleCheckboxChange(s);
                }}
                size={s}
                data={s}
                selected={checkeds.includes(s)}
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
              change={(e) => {
                handleCheckChange(e, "category", c.category);
                handleCheckboxChange(c.category);
              }}
              selected={checkeds.includes(c.category)}
            />
          ))}
      </div>

      <div className="brand-filter">
        <h4>Brand</h4>
        {brands.map((b, i) => (
          <Checkbox
            key={i}
            data={b}
            change={(e) => {
              handleCheckChange(e, "brand", b);
              handleCheckboxChange(b);
            }}
            selected={checkeds.includes(b)}
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
