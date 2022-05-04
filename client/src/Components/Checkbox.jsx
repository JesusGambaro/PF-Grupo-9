import "../Css/checkbox.scss";

const Checkbox = ({data, change, size, selected}) => {
  return (
    <label className={size ? "check-contain size" : "check-contain"}>
      <input
        type="checkbox"
        className={size ? "checkbox size" : "checkbox"}
        onChange={change}
        title={data}
        checked={selected}
      />
      {!size && data}
    </label>
  );
};

export default Checkbox;
