import {deleteFilter, leftSideFilter} from "../redux/actions/leftSideFilter";
import {useDispatch} from "react-redux";
const Filters = ({filters}) => {
  const dispatch = useDispatch();
  
  return (
    <div className="filtrosContainer">
      {filters.map((el, i) => {
        return (
          <div key={i} className="filtroCard">
            <h3>{`${el.name.substring(0,1).toUpperCase() + el.name.substring(1)}: `} {el.value.minValue ? `${el.value.minValue} - ${el.value.maxValue}`  : el.value}</h3>
            <button
              onClick={() => {
                dispatch(deleteFilter(el.name));
                dispatch(leftSideFilter());
              }}
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Filters;
