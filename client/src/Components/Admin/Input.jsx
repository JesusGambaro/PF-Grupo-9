import React from "react";

const Input = ({name, setData, error}) => {
    return (
        <div className="input-container">
            <span className="input-field">{name.charAt(0).toUpperCase() + name.slice(1)}
                <p>{(name !== "sprites" ? "*" : "")}</p></span>
            <input
                className={error ? "error" : ""}
                type={name === "name" ? "text" : name === "sprites" ? "url" : "number"}
                name={name}
                onChange={setData}
                max={150}
                maxLength={name === "sprites" ? "" : 10}
                placeholder={error === "Is required" ? error : ""}
            />

            {(error && error !== "Is required") &&
                <span className="input-error"> &#9888; {error}</span>}

        </div>
    );
};

export default Input;
