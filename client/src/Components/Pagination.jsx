import Card from "./Card";
import Loading from "./Loading";
import LeftSideFilters from "./LeftSideFilters";
import UpSideBar from "./UpSideBar";
import {useState} from "react";
import usePagination from "../hooks/usePagination";

const Pagination = ({shoes, pageLimit, cardsPerPage}) => {
  const [toggle, setToggle] = useState(true);
  const {allData, loading, genderActual} = shoes;
  const {Pagination, dataPerPage} = usePagination(
    allData,
    cardsPerPage,
    pageLimit
  );
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

export default Pagination;
