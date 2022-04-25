import React from "react";

const Input = ({name, setData, error,value}) => {
  return (
    <div className="input-container">
      <input
        className={error ? "error" : ""}
        type={
          name === "price" || name === "sale" || name === "amount"
            ? "number"
            : "text"
        }
        name={name}
        onChange={setData}
        max={150}
        placeholder={error === "Is required" ? error : ""}
        value={value}
      />
      {error && error !== "Is required" && (
        <span className="input-error"> &#9888; {error}</span>
      )}
    </div>
  );
};

export default Input;
