import React from "react";

const Input = ({model, setData, error}) => {
  return (
    <div className="input-container">
      <span className="input-field">
        {model.charAt(0).toUpperCase() + model.slice(1)}
        <p>{model !== "images" ? "*" : ""}</p>
      </span>
      <input
        className={error ? "error" : ""}
        type={
          model === "model" ? "text" : model === "images" ? "url" : "number"
        }
        model={model}
        onChange={setData}
        max={150}
        maxLength={model === "images" ? "" : 10}
        placeholder={error === "Is required" ? error : ""}
      />

      {error && error !== "Is required" && (
        <span className="input-error"> &#9888; {error}</span>
      )}
    </div>
  );
};

export default Input;
