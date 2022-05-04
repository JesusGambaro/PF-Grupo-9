const validation = (param, type) => {
  if (!param || param === "") return type !== "sale" ? "Is required" : "";
  switch (type) {
    case "size":
      if (
        Array.from({length: 14}, (_, i) => 7 + i).indexOf(Number(param)) < 0
      ) {
        return "Must be a size from 7 to 20";
      }
      break;
    case "amount":
      param = Number(param);
      if (param === 0) return "Can't be null";
      if (!/^[0-9]+$/.test(param)) {
        return "Must be just digits";
      } else if (param > 1000) return "Can't exceeds 1000";
      break;
    case "stock":
      return param.length < 1 ? "Almost 1 stock needed" : "";
    case "images":
      let notNull = true;
      if (param.every((e) => e.url === "" || param.length < 1)) notNull = false;
      return notNull ? "" : "Can't be Null";
    case "imageUrl":
      return !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
        param
      )
        ? "Insert a valid URL"
        : "";
    case "price":
      if (!/^[0-9]+$/.test(param)) {
        return "Must be just digits";
      } else if (param > 100000) return "Can't exceeds 100000";
      break;
    case "sale":
      if (!/^[0-9]+$/.test(param)) {
        return "Must be just digits";
      } else if (param > 99) return "Can't exceeds 99%";
      break;
    case "description":
      return param.length < 3
        ? "Minimum length 3"
        : param.length > 500
        ? "Maximum length 500"
        : "";
    default:
      return !/^[A-Za-z0-9\s]+$/g.test(param)
        ? "Must be just characters"
        : param.length < 3
        ? "Minimum length 3"
        : param.length > 20
        ? "Maximum length 20"
        : "";
  }
  return "";
};
export default validation;
