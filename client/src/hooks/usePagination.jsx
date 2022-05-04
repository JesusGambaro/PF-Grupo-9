import {useEffect, useState} from "react";

const usePagination = (data, cardsPerPage, pageLimit) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(data.length / cardsPerPage);
  const nextPage = () => setCurrentPage((currentPage) => currentPage + 1);
  const prevPage = () => setCurrentPage((currentPage) => currentPage - 1);
  const goPage = (e) => setCurrentPage(Number(e.target.textContent));
  useEffect(() => {
    if (data.length < 40) setCurrentPage(1);
  }, [data]);
  const dataPerPage = () => {
    const start = currentPage * cardsPerPage - cardsPerPage,
      end = start + cardsPerPage;
    return data.slice(start, end);
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

  const Pagination = () => {
    return !data.length ? (
      <div className="pagination-container"></div>
    ) : (
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
                  className={currentPage === e ? "btnOwn active" : "btnOwn"}
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
    );
  };

  return {Pagination, dataPerPage};
};

export default usePagination;
