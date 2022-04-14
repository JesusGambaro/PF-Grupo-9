import Card from "./Card";
import Loading from "./Loading";
import LeftSideFilters from "./LeftSideFilters";
import UpSideBar from "./UpSideBar";
import {useEffect, useState} from "react";

const Pagination = ({shoes, pageLimit, cardsPerPage}) => {
  const [toggle, setToggle] = useState(true);
  const {allData, loading} = shoes;
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(allData.length / cardsPerPage);

  const nextPage = () => setCurrentPage((currentPage) => currentPage + 1);

  const prevPage = () => setCurrentPage((currentPage) => currentPage - 1);

  const goPage = (e) => setCurrentPage(Number(e.target.textContent));

  useEffect(() => {
    if (allData.length < 40) setCurrentPage(1);
  }, [allData]);

  const dataPerPage = () => {
    const start = currentPage * cardsPerPage - cardsPerPage,
      end = start + cardsPerPage;
    return allData.slice(start, end);
  };

  const dividedGroups = () => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, i) => {
      let limit = start + i + 1;
      return limit <= pages && limit;
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <div className="home-container">
      <UpSideBar
        quantity={shoes.allData.length}
        handleToggle={(p) => setToggle(p)}
      />
      <LeftSideFilters />
      {loading ? (
        <Loading />
      ) : (
        <div className={"shoes-container" + (toggle ? "" : " h")}>
          {allData.length>0 && dataPerPage().map((e, i) => (
            <Card e={e} key={i} horizontal={!toggle} />
          ))}

          {allData.length > 1 && (
            <div className="pagination-container">
              <div className="selectionOwn">
                <button
                  className="btnOwn prev"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  <i className="fa-solid fa-angle-left"></i>
                </button>
                {dividedGroups().map((e, i) => {
                  return (
                    e && (
                      <button
                        className={
                          currentPage === e ? "btnOwn active" : "btnOwn"
                        }
                        key={i}
                        onClick={goPage}
                      >
                        {e}
                      </button>
                    )
                  );
                })}

                <button
                  className="btnOwn next"
                  onClick={nextPage}
                  disabled={currentPage === pages}
                >
                  <i className="fa-solid fa-angle-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Pagination;
