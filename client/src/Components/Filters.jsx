import {deleteFilter, leftSideFilter} from "../redux/actions/leftSideFilter";
import {useDispatch} from "react-redux";
const Filters = ({filters, handleCheckSelect}) => {
  const dispatch = useDispatch();
  return (
    <div className="filters-container">
      {filters.map((el, i) => {
        return (
          <div key={i} className="filter-card">
            {el.name === "sale" ? (
              <p>On Sale</p>
            ) : (
              <span>
                {`${
                  el.name.substring(0, 1).toUpperCase() + el.name.substring(1)
                }: `}
                <p>
                  {el.name === "price"
                    ? `${el.value.minValue} - ${el.value.maxValue}`
                    : el.value}
                </p>
              </span>
            )}
            <button
              onClick={() => {
                dispatch(deleteFilter(el.name));
                handleCheckSelect(el.value);
                dispatch(leftSideFilter());
              }}
            >
              <i className="bi bi-x-circle-fill"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Filters;
