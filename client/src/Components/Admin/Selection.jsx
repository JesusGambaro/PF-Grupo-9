import React from "react";

const Selection = ({options, type, handleChange}) => {
  return (
    <select
      //disabled={disable || false}
      name={type}
      onChange={(e) => handleChange(e)}
      //defaultValue={filter ? "Filter by type" : "Select type/s"}
    >
      <option disabled={true}>Select {type}</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

export default Selection;
