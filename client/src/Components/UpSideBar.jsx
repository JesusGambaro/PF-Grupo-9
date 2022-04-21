import "../Css/upsidebar.scss";
import {useDispatch} from "react-redux";
import {sortByPrice, resetState} from "../redux/actions/sortBy";
const UpSideBar = ({quantity, handleToggle, genderActual}) => {
  const dispatch = useDispatch();
  const handleSelect = (e) => {
    if (e.target.value === "default") dispatch(resetState());
    else dispatch(sortByPrice(e.target.value));
  };
  return (
    <div className="upsidebar-container">
      <h3 className="titulo">{genderActual + " SHOES"}</h3>
      <div className="view">
        <p>View:</p>
        <i
          className="bi bi-grid-3x3-gap-fill"
          onClick={() => handleToggle(true)}
        ></i>
        <i className="bi bi-list" onClick={() => handleToggle(false)}></i>
      </div>
      <div className="quantity">
        <p>{quantity} Results</p>
      </div>
      <div className="simple-filters">
        <p>
          Hide Filters <i className="bi bi-toggle2-off"></i>
        </p>
        <select
          className="form-select"
          defaultValue="default"
          name="sortby"
          onChange={handleSelect}
        >
          <option value="default">Sort By</option>
          <option value="asc">Price - Low to High</option>
          <option value="des">Price - High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default UpSideBar;
