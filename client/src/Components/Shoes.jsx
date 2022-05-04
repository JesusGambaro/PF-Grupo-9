import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import bringAllData from "../redux/actions/bringAllData";
import {getUserFav} from "../redux/actions/userFav";
import {leftSideFilter} from "../redux/actions/leftSideFilter";
import Card from "./Card";
import Loading from "./Loading";
import LeftSideFilters from "./LeftSideFilters";
import UpSideBar from "./UpSideBar";
import {useState} from "react";
import usePagination from "../hooks/usePagination";
const Shoes = () => {
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.root);
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (!shoes.allData.length) dispatch(bringAllData());
    dispatch(getUserFav(token));
    dispatch(leftSideFilter());
  }, [dispatch]);

  const [toggle, setToggle] = useState(true);
  const {allData, loading, genderActual} = shoes;
  const {Pagination, dataPerPage} = usePagination(allData, 12, 4);
  return (
    <div className="home-container">
      <UpSideBar
        quantity={shoes.allData.length}
        handleToggle={(p) => setToggle(p)}
        genderActual={genderActual}
      />
      <LeftSideFilters />
      {loading ? (
        <Loading />
      ) : (
        <div className="allContainer">
          <div className={"shoes-container" + (toggle ? "" : " h")}>
            {allData.length > 0 ? (
              dataPerPage().map((e, i) => (
                <Card e={e} key={i} horizontal={!toggle} />
              ))
            ) : (
              <h2>No results</h2>
            )}
          </div>
          <Pagination />
        </div>
      )}
    </div>
  );
};

export default Shoes;
