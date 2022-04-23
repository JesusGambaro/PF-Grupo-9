import React from "react";
import "../../Css/AdminProducts.scss";
const ConfirmPanel = ({textoDisplay, cancelFunc, deleteFunc}) => {
  return (
    <div className={"backGroundPanel"} >
      <div className={"confirmPanel"}>
        <h3>{textoDisplay}</h3>
        <div className="confirmPanelButtons">
          <h4>This action cannot be reversed</h4>
          <span>
            <button onClick={() => {
              deleteFunc();
              cancelFunc("Desactive");
            }}>Delete</button>
            <button onClick={() => {
              cancelFunc("Desactive");
            }}>Cancel</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPanel;
