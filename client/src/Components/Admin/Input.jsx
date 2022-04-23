import React from "react";

const Input = ({name, setData, error}) => {
  return (
    <div className="input-container">
      <span className="input-field">
        {name.charAt(0).toUpperCase() + name.slice(1)}
        <p>{name !== "images" ? "*" : ""}</p>
      </span>
      <input
        className={error ? "error" : ""}
        type={name === "price" || name === "sale" ? "number" : "text"}
        name={name}
        onChange={setData}
        max={150}
        placeholder={error === "Is required" ? error : ""}
      />
      {error && error !== "Is required" && (
        <span className="input-error"> &#9888; {error}</span>
      )}
    </div>
  );
};

export default Input;
