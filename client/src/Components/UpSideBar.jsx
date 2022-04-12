import "../Css/upsidebar.scss";

const UpSideBar = ({quantity, handleToggle}) => {
  return (
    <div className="upsidebar-container">
      <div className="view">
        <p>View:</p>
        <i
          className="bi bi-grid-3x3-gap-fill"
          onClick={() => handleToggle(true)}
        ></i>
        <i className="bi bi-list"
        onClick={() => handleToggle(false)}></i>
      </div>
      <div className="quantity">
        <p>Cantidad de productos: {quantity}</p>
      </div>
      <div className="simple-filters">
        <p>
          Hide Filters <i className="bi bi-toggle2-off"></i>
        </p>
        <p>
          Sort by <i className="bi bi-caret-down-fill"></i>
        </p>
      </div>
    </div>
  );
};

export default UpSideBar;
