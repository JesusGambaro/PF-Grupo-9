import "../Css/upsidebar.scss";
import {useDispatch} from "react-redux";
import {sortByPrice} from "../Redux/actions/sortBy";
const UpSideBar = ({quantity, handleToggle}) => {
  const dispatch = useDispatch();
  const handleSelect = (e) => {
    dispatch(sortByPrice(e.target.value));
  };
  return (
    <div className="upsidebar-container">
      <div className="view">
        <p>View:</p>
        <i
          className="bi bi-grid-3x3-gap-fill"
          onClick={() => handleToggle(true)}
        ></i>
        <i className="bi bi-list" onClick={() => handleToggle(false)}></i>
      </div>
      <div className="quantity">
        <p>Cantidad de productos: {quantity}</p>
      </div>
      <div className="simple-filters">
        <p>
          Hide Filters <i className="bi bi-toggle2-off"></i>
        </p>
        <select className="form-select" name="sortby" onChange={handleSelect}>
          <option selected>Sort By</option>
          <option value="asc">Price - Low to High</option>
          <option value="des">Price - High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default UpSideBar;
