const Selection = ({options, type, handleChange,value}) => {
  return (
    <select
      //disabled={disable || false}
      name={type}
      onChange={(e) => handleChange(e)}
      defaultValue={value ? value : "Select " + type}
      className="selectOwn"
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
