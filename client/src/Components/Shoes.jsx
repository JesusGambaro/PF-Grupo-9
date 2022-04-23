import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import Pagination from "./Pagination";
import bringAllData from "../redux/actions/bringAllData";
import {leftSideFilter} from "../redux/actions/leftSideFilter"
const Shoes = () => {
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.root);
  useEffect(() => {
    if (!shoes.allData.length) dispatch(bringAllData());
    dispatch(leftSideFilter());
  }, []);

  return <Pagination shoes={shoes} pageLimit={4} cardsPerPage={12} />;
};
export default Shoes;
