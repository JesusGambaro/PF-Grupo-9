import "../Css/checkbox.scss";

const Checkbox = ({data, change, size}) => {
  return (
    <label className={size ? "check-contain size" : "check-contain"}>
      <input
        type="checkbox"
        className={size ? "checkbox size" : "checkbox"}
        onChange={change}
        title={data}
      />
      {!size && data}
    </label>
  );
};

export default Checkbox;
